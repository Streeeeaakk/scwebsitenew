
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// In a real application, this data would come from your Firebase backend
const alumniList = [
    { id: 1, name: 'Fiona Ozeri', class: '2012', department: 'School of Business and Accountancy', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto-format&fit=crop' },
    { id: 2, name: 'David Chen', class: '2009', department: 'School of Engineering', avatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop' },
    { id: 3, name: 'Tom Russo', class: '2015', department: 'School of Arts and Sciences', avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=2080&auto=format&fit=crop' },
    { id: 4, name: 'Betty Chen', class: '2010', department: 'School of Business and Accountancy', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop' },
    { id: 5, name: 'Dennis Han', class: '2010', department: 'School of Engineering', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop' },
    { id: 6, name: 'Cynthia Lopez', class: '2012', department: 'School of Hospitality Management', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto-format&fit=crop' },
    { id: 7, name: 'Afonso Pinto', class: '2013', department: 'School of Radiologic Technology', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop' },
    { id: 8, name: 'Eric Jones', class: '2011', department: 'School of Engineering', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop' },
    { id: 9, name: 'Wesley Hans M. Platil', class: '2014', department: 'School of Engineering', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop' }
];

export default function AlumniDirectoryPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAlumni, setFilteredAlumni] = useState(alumniList);

    useEffect(() => {
        const results = alumniList.filter(alumnus =>
            alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            alumnus.class.includes(searchTerm) ||
            alumnus.department.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAlumni(results);
    }, [searchTerm]);

    return (
        <div className="bg-muted/40 min-h-screen">
            <div className="container mx-auto py-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <Button asChild variant="outline" size="icon">
                            <Link href="/alumni/feed">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Alumni Directory</h1>
                            <p className="text-muted-foreground">Find and connect with fellow Southlanders.</p>
                        </div>
                    </div>
                    <div className="relative w-full md:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Search by name, class, or department..."
                            className="pl-10 w-full md:w-80"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredAlumni.map(alumnus => (
                        <Card key={alumnus.id} className="hover:shadow-lg transition-shadow">
                            <CardContent className="flex flex-col items-center text-center p-6">
                                <Avatar className="h-24 w-24 mb-4 border-2 border-primary">
                                    <AvatarImage src={alumnus.avatar} alt={alumnus.name} />
                                    <AvatarFallback>{alumnus.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <h3 className="text-lg font-bold text-foreground">{alumnus.name}</h3>
                                <p className="text-sm text-muted-foreground">Class of {alumnus.class}</p>
                                <p className="text-xs text-muted-foreground mt-2 px-2">{alumnus.department}</p>
                                <Button variant="outline" size="sm" className="mt-4 w-full">View Profile</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                 {filteredAlumni.length === 0 && (
                    <div className="text-center col-span-full py-16">
                        <p className="text-muted-foreground">No alumni found matching your search.</p>
                    </div>
                 )}
            </div>
        </div>
    );
}
