"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import { getLinkAnalytics } from "@/server_functions/getLinkAnalytics";
import { getTimeSeriesData } from "@/server_functions/getTimeSeriesData";
import { getGeographicData } from "@/server_functions/getGeographicData";
import { getDeviceData } from "@/server_functions/getDeviceData";
import { getReferrerData } from "@/server_functions/getReferrerData";
import { getUniqueVisitors } from "@/server_functions/getUniqueVisitors";
import CountUp from "react-countup";

/**
 * Individual link analytics page
 * Shows detailed analytics for a specific shortened link
 */
export default function LinkAnalyticsPage() {
    const params = useParams();
    const router = useRouter();
    const alias = params.alias;
    
    const [loading, setLoading] = useState(true);
    const [linkData, setLinkData] = useState(null);
    const [timeSeriesData, setTimeSeriesData] = useState([]);
    const [geographicData, setGeographicData] = useState({ countries: [], cities: [] });
    const [deviceData, setDeviceData] = useState({ devices: [], browsers: [], os: [] });
    const [referrerData, setReferrerData] = useState([]);
    const [uniqueVisitors, setUniqueVisitors] = useState({ unique: 0, total: 0 });
    
    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                // Fetch all analytics data for this specific link
                const [linkInfo, timeData, geoData, devData, refData, uniqueData] = await Promise.all([
                    getLinkAnalytics(alias),
                    getTimeSeriesData(alias, "day", 30),
                    getGeographicData(alias, 10),
                    getDeviceData(alias),
                    getReferrerData(alias, 10),
                    getUniqueVisitors(alias)
                ]);
                
                if (!linkInfo) {
                    // Link doesn't exist or doesn't belong to user
                    router.push("/dashboard/links");
                    return;
                }
                
                setLinkData(linkInfo);
                setTimeSeriesData(timeData);
                setGeographicData(geoData);
                setDeviceData(devData);
                setReferrerData(refData);
                setUniqueVisitors(uniqueData);
                setLoading(false);
            } catch (err) {
                console.error("Error loading analytics:", err);
                setLoading(false);
            }
        };
        
        if (alias) {
            fetchAnalytics();
        }
    }, [alias, router]);
    
    // Chart colors
    const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];
    
    if (loading) {
        return (
            <main className="px-6 md:px-20 lg:px-44 py-10">
                <div className="grid place-items-center h-96">
                    <Loader2 className="animate-spin h-8 w-8" />
                </div>
            </main>
        );
    }
    
    if (!linkData) {
        return null;
    }
    
    return (
        <main className="px-6 md:px-20 lg:px-44 py-10 grid gap-7">
            {/* Header with back button */}
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/links">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Link Analytics</h1>
                    <p className="text-sm text-muted-foreground">
                        {typeof window !== 'undefined' && `https://${window.location.host}/${alias}`}
                    </p>
                </div>
            </div>
            
            {/* Summary Stats */}
            <div className="border rounded-lg grid grid-cols-2 md:grid-cols-4 bg-card shadow-sm">
                <div className="text-center p-4 border-r border-border">
                    <h2 className="text-2xl"><CountUp end={linkData.totalClicks} start={0} /></h2>
                    <span className="text-sm text-muted-foreground">Total Clicks</span>
                </div>
                <div className="text-center p-4 border-r border-border">
                    <h2 className="text-2xl"><CountUp end={uniqueVisitors.unique} start={0} /></h2>
                    <span className="text-sm text-muted-foreground">Unique Visitors</span>
                </div>
                <div className="text-center p-4 border-r border-border">
                    <h2 className="text-2xl">
                        {uniqueVisitors.total > 0 
                            ? ((uniqueVisitors.unique / uniqueVisitors.total) * 100).toFixed(1)
                            : 0}%
                    </h2>
                    <span className="text-sm text-muted-foreground">Unique Rate</span>
                </div>
                <div className="text-center p-4">
                    <h2 className="text-2xl">{geographicData.countries.length}</h2>
                    <span className="text-sm text-muted-foreground">Countries</span>
                </div>
            </div>
            
            {/* Time Series Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Clicks Over Time (Last 30 Days)</CardTitle>
                    <CardDescription>Daily click trends for this link</CardDescription>
                </CardHeader>
                <CardContent>
                    {timeSeriesData.length > 0 ? (
                        <ChartContainer config={{ clicks: { label: "Clicks" } }}>
                            <LineChart data={timeSeriesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Line type="monotone" dataKey="clicks" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                            </LineChart>
                        </ChartContainer>
                    ) : (
                        <div className="grid place-items-center h-60">
                            <p className="text-sm text-muted-foreground">No data available</p>
                        </div>
                    )}
                </CardContent>
            </Card>
            
            {/* Geographic Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Top Countries</CardTitle>
                    <CardDescription>Geographic distribution of clicks</CardDescription>
                </CardHeader>
                <CardContent>
                    {geographicData.countries.length > 0 ? (
                        <ChartContainer config={{ clicks: { label: "Clicks" } }}>
                            <BarChart data={geographicData.countries}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="country" />
                                <YAxis />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="clicks" fill="hsl(var(--chart-1))" />
                            </BarChart>
                        </ChartContainer>
                    ) : (
                        <div className="grid place-items-center h-60">
                            <p className="text-sm text-muted-foreground">No data available</p>
                        </div>
                    )}
                </CardContent>
            </Card>
            
            <div className="grid gap-7 md:gap-3 md:grid-cols-2">
                {/* Device Type Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Device Types</CardTitle>
                        <CardDescription>Mobile vs Desktop vs Tablet</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {deviceData.devices.length > 0 ? (
                            <ChartContainer config={{ clicks: { label: "Clicks" } }}>
                                <PieChart>
                                    <Pie
                                        data={deviceData.devices}
                                        dataKey="clicks"
                                        nameKey="device"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                    >
                                        {deviceData.devices.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                </PieChart>
                            </ChartContainer>
                        ) : (
                            <div className="grid place-items-center h-60">
                                <p className="text-sm text-muted-foreground">No data available</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
                
                {/* Browser Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Browsers</CardTitle>
                        <CardDescription>Browser distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {deviceData.browsers.length > 0 ? (
                            <ChartContainer config={{ clicks: { label: "Clicks" } }}>
                                <BarChart data={deviceData.browsers}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="browser" />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="clicks" fill="hsl(var(--chart-2))" />
                                </BarChart>
                            </ChartContainer>
                        ) : (
                            <div className="grid place-items-center h-60">
                                <p className="text-sm text-muted-foreground">No data available</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid gap-7 md:gap-3 md:grid-cols-2">
                {/* OS Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Operating Systems</CardTitle>
                        <CardDescription>OS distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {deviceData.os.length > 0 ? (
                            <ChartContainer config={{ clicks: { label: "Clicks" } }}>
                                <PieChart>
                                    <Pie
                                        data={deviceData.os}
                                        dataKey="clicks"
                                        nameKey="os"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                    >
                                        {deviceData.os.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                </PieChart>
                            </ChartContainer>
                        ) : (
                            <div className="grid place-items-center h-60">
                                <p className="text-sm text-muted-foreground">No data available</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
                
                {/* Referrer Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Referrers</CardTitle>
                        <CardDescription>Where your clicks come from</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {referrerData.length > 0 ? (
                            <div className="space-y-2">
                                {referrerData.map((ref, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                                        <span className="text-sm">{ref.referrer}</span>
                                        <span className="text-sm font-medium">{ref.clicks}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid place-items-center h-60">
                                <p className="text-sm text-muted-foreground">No data available</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}

