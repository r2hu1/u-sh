"use client";
import { getUserData } from "@/server_functions/getUserData";
import { ExternalLink, Eye, Loader2, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { getTimeSeriesData } from "@/server_functions/getTimeSeriesData";
import { getGeographicData } from "@/server_functions/getGeographicData";
import { getDeviceData } from "@/server_functions/getDeviceData";
import { getReferrerData } from "@/server_functions/getReferrerData";
import { getUniqueVisitors } from "@/server_functions/getUniqueVisitors";
import { getHourlyBreakdown } from "@/server_functions/getHourlyBreakdown";
import { getPeakHours } from "@/server_functions/getPeakHours";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

export default function page() {
    const [totalLinks, setTotalLinks] = useState([]);
    const [top5Links, setTop5Links] = useState([]);
    const [totalClicks, setTotalClicks] = useState(0);
    const [loading, setLoading] = useState(true);
    
    // New analytics state
    const [timeSeriesData, setTimeSeriesData] = useState([]);
    const [geographicData, setGeographicData] = useState({ countries: [], cities: [] });
    const [deviceData, setDeviceData] = useState({ devices: [], browsers: [], os: [] });
    const [referrerData, setReferrerData] = useState([]);
    const [uniqueVisitors, setUniqueVisitors] = useState({ unique: 0, total: 0 });
    const [hourlyBreakdown, setHourlyBreakdown] = useState([]);
    const [peakHours, setPeakHours] = useState({ peakHours: [], peakDays: [], topHour: null, topDay: null });
    const [analyticsLoading, setAnalyticsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const getAllData = async () => {
        const [allClicks, topLinks, allLinks] = await getUserData();
        setTotalLinks(JSON.parse(allLinks));
        setTop5Links(JSON.parse(topLinks));
        setTotalClicks(allClicks > 2 ? allClicks - 1 : 0);
        setLoading(false);
    };
    
    const getAnalyticsData = async (isRefresh = false) => {
        if (isRefresh) {
            setRefreshing(true);
        } else {
            setAnalyticsLoading(true);
        }
        
        try {
            // Fetch all analytics data in parallel
            const [timeData, geoData, devData, refData, uniqueData, hourlyData, peakData] = await Promise.all([
                getTimeSeriesData(null, "day", 30),
                getGeographicData(null, 10),
                getDeviceData(null),
                getReferrerData(null, 10),
                getUniqueVisitors(null),
                getHourlyBreakdown(null, 30),
                getPeakHours(null, 30)
            ]);
            
            setTimeSeriesData(timeData);
            setGeographicData(geoData);
            setDeviceData(devData);
            setReferrerData(refData);
            setUniqueVisitors(uniqueData);
            setHourlyBreakdown(hourlyData);
            setPeakHours(peakData);
            setAnalyticsLoading(false);
            setRefreshing(false);
        } catch (err) {
            console.error("Error loading analytics:", err);
            setAnalyticsLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        getAllData();
        getAnalyticsData();
    }, []);
    
    // Chart colors
    const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];
    
    // Format hour for display (0-23 to 12am-11pm)
    const formatHour = (hour) => {
        if (hour === 0) return "12am";
        if (hour < 12) return `${hour}am`;
        if (hour === 12) return "12pm";
        return `${hour - 12}pm`;
    };
    
    // Convert UTC hour to user's local timezone hour
    const convertUTCToLocalHour = (utcHour) => {
        // Create a date object for today at the UTC hour
        const now = new Date();
        const utcDate = new Date(Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            utcHour,
            0,
            0
        ));
        
        // Get the local hour from this UTC date
        return utcDate.getHours();
    };
    
    // Convert peak hours from UTC to user's local timezone
    const convertPeakHoursToLocal = (peakHoursData) => {
        return peakHoursData.map(item => ({
            ...item,
            localHour: convertUTCToLocalHour(item.hour),
            hour: convertUTCToLocalHour(item.hour) // Use local hour for display
        }));
    };
    
    return (
        <main className="px-6 md:px-20 lg:px-44 py-10 grid gap-7">
            {/* Header with refresh button */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Statistics</h1>
                    <p className="text-sm text-muted-foreground">Analytics overview for all your links</p>
                </div>
                <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                        getAllData();
                        getAnalyticsData(true);
                    }}
                    disabled={refreshing || loading || analyticsLoading}
                    className="flex items-center gap-2"
                >
                    <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>
            
            <div className="border rounded-lg grid grid-cols-2 md:grid-cols-4 bg-card shadow-sm">
                <div className="text-center p-4 border-r border-border">
                    <h2 className="text-2xl"><CountUp end={totalLinks.length} start={0} /></h2>
                    <span className="text-sm text-muted-foreground">Links Created</span>
                </div>
                <div className="text-center p-4 border-r border-border">
                    <h2 className="text-2xl"><CountUp end={totalClicks} start={0} /></h2>
                    <span className="text-sm text-muted-foreground">Total Clicks</span>
                </div>
                <div className="text-center p-4 border-r border-border">
                    <h2 className="text-2xl"><CountUp end={uniqueVisitors.unique} start={0} /></h2>
                    <span className="text-sm text-muted-foreground">Unique Visitors</span>
                </div>
                <div className="text-center p-4">
                    <h2 className="text-2xl">
                        {uniqueVisitors.total > 0 
                            ? ((uniqueVisitors.unique / uniqueVisitors.total) * 100).toFixed(1)
                            : 0}%
                    </h2>
                    <span className="text-sm text-muted-foreground">Unique Rate</span>
                </div>
            </div>
            
            {/* Top Links and All Links */}
            <div className="grid gap-7 md:gap-3 md:grid-cols-2">
                <div className="border h-fit border-border rounded-lg px-4 py-4 bg-card shadow-sm">
                    <div>
                        <h2 className="text-lg">Top {top5Links.filter((link) => link.clicks).length} Links</h2>
                        <p className="text-sm text-muted-foreground">the top {top5Links.filter((link) => link.clicks).length} links by clicks</p>
                    </div>
                    <div className="border-dashed rounded-lg mt-4 border border-border">
                        {loading && (
                            <div className="grid place-items-center h-60">
                                <Loader2 className="animate-spin h-4 w-5" />
                            </div>
                        )}
                        {top5Links.filter((link) => link.clicks).map((link) => (
                            <div key={link._id} className="grid gap-2 p-4 linkList">
                                <Link target="_blank" className="text-sm opacity-85 flex items-center justify-between" href={`https://${location.host}/${link.alias}`}>
                                    <span className="hover:underline">https://{location.host}/{link.alias}</span> <p className="text-sm text-muted-foreground flex items-center gap-1 bg-accent/50 rounded-full px-2 cursor-pointer py-1 w-fit"><CountUp end={link.clicks > 2 ? link.clicks - 1 : link.clicks} start={0} /> <Eye className="h-4 w-4" /></p>
                                </Link>
                            </div>
                        ))}
                        {!loading && !top5Links.filter((link) => link.clicks).length &&
                            (<div className="grid gap-2 p-4 place-items-center h-60">
                                <p className="text-sm text-muted-foreground">No links found.</p>
                            </div>)
                        }
                    </div>
                </div>

                <div className="border h-fit border-border rounded-lg px-4 py-4 bg-card shadow-sm">
                    <div>
                        <h2 className="text-lg">All Links & Clicks</h2>
                        <p className="text-sm text-muted-foreground">all your links and their clicks</p>
                    </div>
                    <div className="border-dashed rounded-lg mt-4 border border-border">
                        {loading && (
                            <div className="grid place-items-center h-60">
                                <Loader2 className="animate-spin h-4 w-5" />
                            </div>
                        )}
                        {!loading && !totalLinks.length ? (
                            <div className="grid place-items-center h-60">
                                <p className="text-sm text-muted-foreground">No links found.</p>
                            </div>
                        ) : null}
                        {totalLinks.map((link) => (
                            <div key={link._id} className="grid gap-2 p-4 linkList">
                                <Link target="_blank" className="text-sm opacity-85 flex items-center justify-between" href={`https://${location.host}/${link.alias}`}>
                                    <span className="hover:underline">https://{location.host}/{link.alias}</span> <p className="text-sm text-muted-foreground flex items-center gap-1 bg-accent/50 rounded-full px-2 cursor-pointer py-1 w-fit"><CountUp end={link.clicks > 2 ? link.clicks - 1 : link.clicks} start={0} /> <Eye className="h-4 w-4" /></p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Time Series Chart and Geographic Chart in same row */}
            <div className="grid gap-7 md:gap-3 md:grid-cols-2">
                {/* Time Series Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Clicks Over Time (Last 30 Days)</CardTitle>
                        <CardDescription>Daily click trends for all your links</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {analyticsLoading ? (
                            <div className="grid place-items-center h-60">
                                <Loader2 className="animate-spin h-4 w-5" />
                            </div>
                        ) : timeSeriesData.length > 0 ? (
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
                        {analyticsLoading ? (
                            <div className="grid place-items-center h-60">
                                <Loader2 className="animate-spin h-4 w-5" />
                            </div>
                        ) : geographicData.countries.length > 0 ? (
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
            </div>
            
            <div className="grid gap-7 md:gap-3 md:grid-cols-2">
                {/* Device Type Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Device Types</CardTitle>
                        <CardDescription>Mobile vs Desktop vs Tablet</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {analyticsLoading ? (
                            <div className="grid place-items-center h-60">
                                <Loader2 className="animate-spin h-4 w-5" />
                            </div>
                        ) : deviceData.devices.length > 0 ? (
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
                        {analyticsLoading ? (
                            <div className="grid place-items-center h-60">
                                <Loader2 className="animate-spin h-4 w-5" />
                            </div>
                        ) : deviceData.browsers.length > 0 ? (
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
                        {analyticsLoading ? (
                            <div className="grid place-items-center h-60">
                                <Loader2 className="animate-spin h-4 w-5" />
                            </div>
                        ) : deviceData.os.length > 0 ? (
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
                        {analyticsLoading ? (
                            <div className="grid place-items-center h-60">
                                <Loader2 className="animate-spin h-4 w-5" />
                            </div>
                        ) : referrerData.length > 0 ? (
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
            
            {/* Hourly Breakdown Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Hourly Breakdown</CardTitle>
                    <CardDescription>Clicks by hour of day across all links (last 30 days) - {Intl.DateTimeFormat().resolvedOptions().timeZone}</CardDescription>
                </CardHeader>
                <CardContent>
                    {analyticsLoading ? (
                        <div className="grid place-items-center h-60">
                            <Loader2 className="animate-spin h-4 w-5" />
                        </div>
                    ) : hourlyBreakdown.length > 0 ? (
                        <ChartContainer config={{ clicks: { label: "Clicks" } }}>
                            <BarChart data={hourlyBreakdown.map(item => ({
                                ...item,
                                hour: convertUTCToLocalHour(item.hour)
                            }))}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis 
                                    dataKey="hour" 
                                    tickFormatter={(value) => formatHour(value)}
                                />
                                <YAxis />
                                <ChartTooltip 
                                    content={<ChartTooltipContent />}
                                    labelFormatter={(value) => formatHour(value)}
                                />
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
            
            {/* Peak Hours Analysis */}
            <div className="grid gap-7 md:gap-3 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Peak Hours of Day</CardTitle>
                        <CardDescription>
                            {peakHours.topHour 
                                ? `Peak hour: ${formatHour(convertUTCToLocalHour(peakHours.topHour.hour))} (${peakHours.topHour.clicks} clicks) - ${Intl.DateTimeFormat().resolvedOptions().timeZone}`
                                : `Busiest hours across all links - ${Intl.DateTimeFormat().resolvedOptions().timeZone}`}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {analyticsLoading ? (
                            <div className="grid place-items-center h-60">
                                <Loader2 className="animate-spin h-4 w-5" />
                            </div>
                        ) : peakHours.peakHours.length > 0 ? (
                            <ChartContainer config={{ clicks: { label: "Clicks" } }}>
                                <BarChart data={convertPeakHoursToLocal(peakHours.peakHours)}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis 
                                        dataKey="hour" 
                                        tickFormatter={(value) => formatHour(value)}
                                    />
                                    <YAxis />
                                    <ChartTooltip 
                                        content={<ChartTooltipContent />}
                                        labelFormatter={(value) => formatHour(value)}
                                    />
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
                
                <Card>
                    <CardHeader>
                        <CardTitle>Peak Days of Week</CardTitle>
                        <CardDescription>
                            {peakHours.topDay 
                                ? `Peak day: ${peakHours.topDay.dayName} (${peakHours.topDay.clicks} clicks)`
                                : "Busiest days across all links"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {analyticsLoading ? (
                            <div className="grid place-items-center h-60">
                                <Loader2 className="animate-spin h-4 w-5" />
                            </div>
                        ) : peakHours.peakDays.length > 0 ? (
                            <ChartContainer config={{ clicks: { label: "Clicks" } }}>
                                <BarChart data={peakHours.peakDays}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="dayName" />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="clicks" fill="hsl(var(--chart-3))" />
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
        </main>
    )
}