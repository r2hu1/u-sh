"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, ArrowLeft, RefreshCw } from "lucide-react";
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
import { getHourlyBreakdown } from "@/server_functions/getHourlyBreakdown";
import { getClickLog } from "@/server_functions/getClickLog";
import { getPeakHours } from "@/server_functions/getPeakHours";
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
    const [hourlyBreakdown, setHourlyBreakdown] = useState([]);
    const [peakHours, setPeakHours] = useState({ peakHours: [], peakDays: [], topHour: null, topDay: null });
    const [clickLog, setClickLog] = useState({ clicks: [], total: 0, page: 1, totalPages: 0 });
    const [clickLogPage, setClickLogPage] = useState(1);
    const [clickLogLoading, setClickLogLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    
    const fetchAnalytics = async (isRefresh = false) => {
        if (isRefresh) {
            setRefreshing(true);
        } else {
            setLoading(true);
        }
        
        try {
            // Fetch all analytics data for this specific link
            const [linkInfo, timeData, geoData, devData, refData, uniqueData, hourlyData, peakData, logData] = await Promise.all([
                getLinkAnalytics(alias),
                getTimeSeriesData(alias, "day", 30),
                getGeographicData(alias, 10),
                getDeviceData(alias),
                getReferrerData(alias, 10),
                getUniqueVisitors(alias),
                getHourlyBreakdown(alias, 30),
                getPeakHours(alias, 30),
                getClickLog(alias, clickLogPage, 20)
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
            setHourlyBreakdown(hourlyData);
            setPeakHours(peakData);
            setClickLog(logData);
            setLoading(false);
            setRefreshing(false);
        } catch (err) {
            console.error("Error loading analytics:", err);
            setLoading(false);
            setRefreshing(false);
        }
    };
    
    useEffect(() => {
        if (alias) {
            fetchAnalytics();
        }
    }, [alias, router]);
    
    // Fetch click log when page changes
    useEffect(() => {
        const fetchClickLog = async () => {
            if (!alias) return;
            setClickLogLoading(true);
            try {
                const logData = await getClickLog(alias, clickLogPage, 20);
                setClickLog(logData);
            } catch (err) {
                console.error("Error loading click log:", err);
            } finally {
                setClickLogLoading(false);
            }
        };
        
        if (clickLogPage > 1) {
            fetchClickLog();
        }
    }, [clickLogPage, alias]);
    
    // Format timestamp helper - displays in user's local timezone
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };
    
    // Format relative time helper
    const formatRelativeTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        return formatTimestamp(timestamp);
    };
    
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
            {/* Header with back button and refresh */}
            <div className="flex items-center justify-between gap-4">
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
                <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fetchAnalytics(true)}
                    disabled={refreshing || loading}
                    className="flex items-center gap-2"
                >
                    <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
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
            
            {/* Click Log Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Click Log</CardTitle>
                    <CardDescription>Detailed list of individual clicks ({clickLog.total} total)</CardDescription>
                </CardHeader>
                <CardContent>
                    {clickLogLoading ? (
                        <div className="grid place-items-center h-60">
                            <Loader2 className="animate-spin h-4 w-5" />
                        </div>
                    ) : clickLog.clicks.length > 0 ? (
                        <div className="space-y-4">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left p-2">Timestamp</th>
                                            <th className="text-left p-2">IP Address</th>
                                            <th className="text-left p-2">Location</th>
                                            <th className="text-left p-2">Device</th>
                                            <th className="text-left p-2">Browser</th>
                                            <th className="text-left p-2">OS</th>
                                            <th className="text-left p-2">Referrer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clickLog.clicks.map((click) => (
                                            <tr key={click.id} className="border-b hover:bg-muted/50">
                                                <td className="p-2">
                                                    <div className="flex flex-col">
                                                        <span>{formatTimestamp(click.timestamp)}</span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {formatRelativeTime(click.timestamp)}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-2">
                                                    <div className="flex flex-col">
                                                        <span className="font-mono text-sm">{click.ip}</span>
                                                        {click.ip_hash && (
                                                            <span className="text-xs text-muted-foreground font-mono">
                                                                Hash: {click.ip_hash.substring(0, 8)}...
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-2">
                                                    <div className="flex flex-col">
                                                        <span>{click.country}</span>
                                                        {click.city !== "Unknown" && (
                                                            <span className="text-xs text-muted-foreground">{click.city}</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-2 capitalize">{click.device}</td>
                                                <td className="p-2">{click.browser}</td>
                                                <td className="p-2">{click.os}</td>
                                                <td className="p-2">
                                                    <span className="capitalize">{click.referrer}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Pagination */}
                            {clickLog.totalPages > 1 && (
                                <div className="flex items-center justify-between pt-4">
                                    <div className="text-sm text-muted-foreground">
                                        Page {clickLog.page} of {clickLog.totalPages}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setClickLogPage(p => Math.max(1, p - 1))}
                                            disabled={clickLogPage === 1 || clickLogLoading}
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setClickLogPage(p => Math.min(clickLog.totalPages, p + 1))}
                                            disabled={clickLogPage === clickLog.totalPages || clickLogLoading}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="grid place-items-center h-60">
                            <p className="text-sm text-muted-foreground">No clicks recorded yet</p>
                        </div>
                    )}
                </CardContent>
            </Card>
            
            {/* Click Timeline */}
            <Card>
                <CardHeader>
                    <CardTitle>Click Timeline</CardTitle>
                    <CardDescription>Chronological view of recent clicks</CardDescription>
                </CardHeader>
                <CardContent>
                    {clickLog.clicks.length > 0 ? (
                        <div className="space-y-4">
                            {clickLog.clicks.map((click, index) => {
                                const clickDate = new Date(click.timestamp);
                                const prevClickDate = index > 0 ? new Date(clickLog.clicks[index - 1].timestamp) : null;
                                const isNewDay = !prevClickDate || 
                                    clickDate.toDateString() !== prevClickDate.toDateString();
                                
                                return (
                                    <div key={click.id}>
                                        {isNewDay && (
                                            <div className="text-sm font-medium text-muted-foreground mb-2 pt-2 border-t">
                                                {clickDate.toLocaleDateString('en-US', { 
                                                    weekday: 'long', 
                                                    year: 'numeric', 
                                                    month: 'long', 
                                                    day: 'numeric' 
                                                })}
                                            </div>
                                        )}
                                        <div className="flex items-start gap-4 p-3 border rounded-lg hover:bg-muted/50">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-sm font-medium">
                                                        {formatRelativeTime(click.timestamp)}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        ({formatTimestamp(click.timestamp)})
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                                                    <span>{click.country}</span>
                                                    {click.city !== "Unknown" && <span>• {click.city}</span>}
                                                    <span>• {click.device}</span>
                                                    <span>• {click.browser}</span>
                                                    <span>• {click.os}</span>
                                                    {click.referrer !== "direct" && (
                                                        <span>• From {click.referrer}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="grid place-items-center h-60">
                            <p className="text-sm text-muted-foreground">No clicks recorded yet</p>
                        </div>
                    )}
                </CardContent>
            </Card>
            
            {/* Time Series Chart and Geographic Chart in same row */}
            <div className="grid gap-7 md:gap-3 md:grid-cols-2">
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
            </div>
            
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
            
            {/* Hourly Breakdown Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Hourly Breakdown</CardTitle>
                    <CardDescription>Clicks by hour of day (last 30 days) - {Intl.DateTimeFormat().resolvedOptions().timeZone}</CardDescription>
                </CardHeader>
                <CardContent>
                    {hourlyBreakdown.length > 0 ? (
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
                                ? `Peak hour: ${formatHour(convertUTCToLocalHour(peakHours.topHour.hour))} (${peakHours.topHour.clicks} clicks) - Your Timezone`
                                : "Busiest hours - Your Timezone"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {peakHours.peakHours.length > 0 ? (
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
                                : "Busiest days"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {peakHours.peakDays.length > 0 ? (
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
    );
}

