
'use client';

import Link from 'next/link';
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Newspaper,
  CreditCard,
  DollarSign,
  Users,
  Image,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { getNewsArticles, getAcademicPrograms, getJobPostings, getAlumniCount, getSiteVisits } from '@/app/actions';
import { useEffect, useState } from 'react';
import { NewsItem, AcademicProgram, JobPosting } from '@/lib/schemas';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ news: 0, academics: 0, careers: 0, alumni: 0, visits: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [news, academics, jobs, alumni, visits] = await Promise.all([
                    getNewsArticles(),
                    getAcademicPrograms(),
                    getJobPostings(),
                    getAlumniCount(),
                    getSiteVisits(),
                ]);
                setStats({
                    news: news.length,
                    academics: academics.length,
                    careers: jobs.length,
                    alumni: alumni,
                    visits: visits,
                });
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    const chartData = [
        { name: 'News', total: stats.news },
        { name: 'Academics', total: stats.academics },
        { name: 'Careers', total: stats.careers },
    ];

    const StatCard = ({ title, value, icon: Icon, link, linkText }: { title: string, value: number, icon: React.ElementType, link?: string, linkText?: string }) => {
        if (isLoading) {
            return (
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-6 w-6" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-12" />
                        <Skeleton className="h-4 w-32 mt-2" />
                    </CardContent>
                </Card>
            )
        }
        return (
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{value.toLocaleString()}</div>
                    {link && linkText ? (
                        <Button variant="link" asChild className="text-xs text-muted-foreground p-0">
                            <Link href={link}>
                                {linkText}
                            </Link>
                        </Button>
                    ) : (
                        <p className="text-xs text-muted-foreground">Real-time basic analytics</p>
                    )}
                </CardContent>
            </Card>
        )
    };

  return (
    <div className="flex w-full flex-col">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <StatCard title="Total Site Visits" value={stats.visits} icon={Activity} />
          <StatCard title="Registered Alumni" value={stats.alumni} icon={Users} link="/alumni/portal" linkText="View Alumni Portal" />
          <StatCard title="News Articles" value={stats.news} icon={Newspaper} link="/admin/settings/news" linkText="Manage News" />
          <StatCard title="Academic Programs" value={stats.academics} icon={BookOpen} link="/admin/settings/academics" linkText="Manage Academics" />
        </div>
        <div className="mt-8 grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Content Overview</CardTitle>
              <CardDescription>A summary of content across the site.</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <Skeleton className="w-full h-[350px]" />
                ) : (
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={chartData}>
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                            allowDecimals={false}
                        />
                        <Tooltip
                            contentStyle={{ 
                                backgroundColor: 'hsl(var(--background))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: 'var(--radius)'
                            }}
                        />
                        <Legend wrapperStyle={{fontSize: "12px"}}/>
                        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Quick Settings</CardTitle>
                    <CardDescription>
                    Quickly jump to key management pages.
                    </CardDescription>
                </div>
                 <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="/admin/settings">
                        View All
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent className="grid gap-6">
                <Link href="/admin/settings/site-images" className="flex items-center gap-4 p-2 rounded-md hover:bg-muted">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" alt="Site Images" />
                        <AvatarFallback>SI</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">Site Images</p>
                        <p className="text-sm text-muted-foreground">Manage logos, headers, and backgrounds.</p>
                    </div>
                </Link>
                 <Link href="/admin/settings/homepage" className="flex items-center gap-4 p-2 rounded-md hover:bg-muted">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" alt="Homepage" />
                        <AvatarFallback>HP</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">Homepage Content</p>
                        <p className="text-sm text-muted-foreground">Edit "Why Choose Us" features.</p>
                    </div>
                </Link>
                <Link href="/admin/settings/gallery" className="flex items-center gap-4 p-2 rounded-md hover:bg-muted">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src="https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?q=80&w=1974&auto=format&fit=crop" alt="Gallery" />
                        <AvatarFallback>GL</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">Image Gallery</p>
                        <p className="text-sm text-muted-foreground">View all uploaded assets.</p>
                    </div>
                </Link>
            </CardContent>
          </Card>
        </div>
    </div>
  )
}
