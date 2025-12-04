
'use client';

import { useState }from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, GraduationCap, MapPin, Camera, Video, MessageCircle, ThumbsUp, Plus, Clock, ChevronDown, User, Users, Gift, Wifi, Smile, Menu, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { EventsCalendarModal } from '@/components/EventsCalendarModal';
import { Textarea } from '@/components/ui/textarea';

const stories = [
  { name: 'Tom Russo', image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=2080&auto=format&fit=crop' },
  { name: 'Betty Chen', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop' },
  { name: 'Dennis Han', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop' },
  { name: 'Cynthia Lopez', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop' },
  { name: 'Afonso Pinto', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop' },
];

const initialFeedItems = [
  {
    id: 1,
    author: {
      name: 'Fiona Ozeri',
      title: 'Marketing Director at Innovate Inc. (Class of 2012)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
    },
    time: '5h ago',
    content: "Just attended the annual Alumni Homecoming Gala. It was incredible to see so many familiar faces and catch up with old professors. The fireworks show was the best I've ever seen! So proud to be a Southlander.",
    likes: 125,
    comments: [
        { author: 'David Chen', text: 'It was a great event! So good to see you.'},
        { author: 'Betty Chen', text: 'Wish I could have been there! Looks amazing.'},
    ],
    image: 'https://images.unsplash.com/photo-1533228100141-79ab41a75e33?q=80&w=2070&auto=format&fit=crop',
    imageHint: 'fireworks show',
  },
  {
    id: 2,
    author: {
      name: 'David Chen',
      title: 'CEO at Future Systems (Class of 2009)',
      avatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop',
    },
    time: 'Yesterday',
    content: "Just wrapped up a keynote speech on the future of AI. It was an honor to be invited back to campus for the Innovators Summit. The energy and talent of the current students are incredible. The future is bright for Southland!",
    likes: 302,
    comments: [],
  },
];

const shortcuts = [
  { name: 'Alumni Job Board', image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop', href: '/careers' },
  { name: 'Mentorship Program', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop', href: '/under-construction' },
  { name: 'Campus News', image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069&auto=format&fit=crop', href: '/news' },
];

const contacts = [
  { name: 'Dennis Han (2010)', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop' },
  { name: 'Eric Jones (2011)', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop' },
  { name: 'Cynthia Lopez (2012)', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop' },
  { name: 'Betty Chen (2010)', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop' },
];

const FeedPost = ({ item, onLike, onComment }: { item: typeof initialFeedItems[0], onLike: () => void, onComment: (text: string) => void }) => {
    const [commentText, setCommentText] = useState('');
    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (commentText.trim()) {
            onComment(commentText);
            setCommentText('');
        }
    };
    return (
        <Card>
            <CardHeader className="flex-row items-center gap-3 space-y-0 p-4">
                <Avatar>
                    <AvatarImage src={item.author.avatar} />
                    <AvatarFallback>{item.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-semibold text-foreground">{item.author.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.author.title} • {item.time}</p>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <p className="mb-4">{item.content}</p>
                {item.image && (
                <div className="relative -mx-4 md:mx-0 aspect-video w-auto rounded-none md:rounded-lg overflow-hidden border">
                    <Image src={item.image} alt="Feed post image" fill className="object-cover" data-ai-hint={item.imageHint} />
                </div>
                )}
                <div className="flex justify-between items-center mt-4 text-muted-foreground text-sm">
                    <span>{item.likes} Likes</span>
                    <span>{item.comments.length} Comments</span>
                </div>
                <div className="flex justify-around mt-2 pt-2 border-t">
                    <Button variant="ghost" size="sm" onClick={onLike}><ThumbsUp className="h-4 w-4 mr-2" />Like</Button>
                    <Button variant="ghost" size="sm"><MessageCircle className="h-4 w-4 mr-2" />Comment</Button>
                </div>
                <div className="mt-4 pt-4 border-t space-y-4">
                    {item.comments.map((comment, index) => (
                        <div key={index} className="flex items-start gap-2">
                             <Avatar className="h-8 w-8">
                                {/* This is a simplification. A real app would fetch user avatars. */}
                                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="bg-muted p-2 rounded-lg text-sm w-full">
                                <span className="font-semibold text-foreground mr-2">{comment.author}</span>
                                <span className="text-muted-foreground">{comment.text}</span>
                            </div>
                        </div>
                    ))}
                     <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop" />
                        </Avatar>
                        <Input 
                            placeholder="Write a comment..." 
                            className="bg-muted"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <Button type="submit" size="sm">Post</Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
};


const LeftSidebarContent = () => (
    <div className="sticky top-14 space-y-2">
        <Button asChild variant="ghost" className="w-full justify-start p-2">
             <Link href="/alumni/profile/wesley-hans-m-platil">
                <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop" />
                    <AvatarFallback>WP</AvatarFallback>
                </Avatar>
                <span className="font-semibold text-foreground">Wesley Hans M. Platil</span>
             </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start p-2 text-muted-foreground hover:text-foreground">
            <Link href="/alumni/group-chat">
                <MessageSquare className="h-6 w-6 mr-3 text-primary" />
                <span>Batch Group Chat</span>
            </Link>
        </Button>
        <EventsCalendarModal>
            <Button variant="ghost" className="w-full justify-start p-2 text-muted-foreground hover:text-foreground">
                <GraduationCap className="h-6 w-6 mr-3 text-primary" />
                <span>Alumni Events</span>
            </Button>
        </EventsCalendarModal>
         <Button asChild variant="ghost" className="w-full justify-start p-2 text-muted-foreground hover:text-foreground">
            <Link href="/alumni/directory">
                <Users className="h-6 w-6 mr-3 text-primary" />
                <span>Find Alumni</span>
            </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start p-2 text-muted-foreground hover:text-foreground">
            <Link href="/under-construction">
                <Clock className="h-6 w-6 mr-3 text-primary" />
                <span>Memories</span>
            </Link>
        </Button>
        <hr className="my-4"/>
        <h3 className="text-muted-foreground font-semibold text-lg px-2">Quick Links</h3>
         {shortcuts.map(shortcut => (
             <Button key={shortcut.name} variant="ghost" className="w-full justify-start p-2 text-muted-foreground hover:text-foreground" asChild>
                <Link href={shortcut.href}>
                    <div className="w-8 h-8 mr-3 relative rounded-lg overflow-hidden">
                        <Image src={shortcut.image} alt={shortcut.name} fill className="object-cover" />
                    </div>
                    <span>{shortcut.name}</span>
                </Link>
            </Button>
         ))}
    </div>
);

const RightSidebarContent = () => (
    <div className="sticky top-14 space-y-6">
        <div>
          <h3 className="font-semibold text-muted-foreground mb-2">Sponsored</h3>
           <a href="#" className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted">
              <div className="w-28 h-28 relative rounded-lg overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop" alt="Lebo's Pizza" fill className="object-cover"/>
              </div>
              <div>
                <p className="font-semibold text-foreground">Lebo's Pizza</p>
                <p className="text-xs text-muted-foreground">Alumni-owned business</p>
              </div>
          </a>
        </div>
         <hr />
         <div>
            <h3 className="font-semibold text-muted-foreground mb-2">Birthdays</h3>
            <Button variant="ghost" className="w-full justify-start p-2 text-muted-foreground hover:text-foreground">
                <Gift className="h-8 w-8 mr-3 text-primary" />
                <span><b>Jessica (2013)</b> & <b>Erica (2015)</b> have birthdays today.</span>
            </Button>
         </div>
         <hr />
        <div>
            <h3 className="font-semibold text-muted-foreground mb-2">My Network</h3>
            {contacts.map(person => (
               <Button key={person.name} variant="ghost" className="w-full justify-start p-2 text-muted-foreground hover:text-foreground">
                  <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src={person.avatar} />
                      <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold text-foreground">{person.name}</span>
               </Button>
            ))}
        </div>
     </div>
);


export default function AlumniFeedPage() {
  const [feedItems, setFeedItems] = useState(initialFeedItems);
  const [newPostContent, setNewPostContent] = useState('');

  const handleLike = (postId: number) => {
    setFeedItems(prevItems =>
      prevItems.map(item =>
        item.id === postId ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  const handleComment = (postId: number, text: string) => {
      setFeedItems(prevItems =>
        prevItems.map(item =>
          item.id === postId 
          ? { ...item, comments: [...item.comments, { author: 'Wesley Hans M. Platil', text }] } 
          : item
        )
      );
  };

  const handleCreatePost = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newPostContent.trim()) return;

      const newPost = {
          id: feedItems.length + 1,
          author: {
              name: 'Wesley Hans M. Platil',
              title: 'Class of 2014',
              avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop',
          },
          time: 'Just now',
          content: newPostContent,
          likes: 0,
          comments: [],
      };
      setFeedItems([newPost, ...feedItems]);
      setNewPostContent('');
  };


  return (
    <div className="bg-muted/40 min-h-[calc(100vh-56px)]">
      <div className="container mx-auto grid grid-cols-12 gap-4 md:gap-8 px-2 sm:px-4">
      
        {/* Left Sidebar - Desktop */}
        <aside className="hidden lg:block col-span-3 py-4">
          <LeftSidebarContent />
        </aside>

        {/* Main Content Feed */}
        <main className="col-span-12 lg:col-span-6 space-y-6 py-4">
          {/* Stories */}
          <Card className="overflow-x-auto">
              <div className="flex space-x-2 p-3 bg-card">
                <Link href="/under-construction" className="w-1/4 sm:w-1/5 shrink-0">
                    <div className="relative group aspect-[2/3] rounded-lg overflow-hidden">
                        <Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop" alt="Create a story" fill className="object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20" />
                        <div className="absolute bottom-0 w-full text-center">
                            <Button size="icon" className="relative -bottom-4 rounded-full border-4 border-card h-10 w-10">
                                <Plus className="h-6 w-6"/>
                            </Button>
                            <p className="text-xs font-semibold text-card-foreground absolute bottom-[-28px] left-0 right-0">Create Story</p>
                        </div>
                    </div>
                </Link>
                <div className="flex space-x-2 flex-grow">
                  {stories.map(story => (
                    <div key={story.name} className="w-1/4 sm:w-1/5 shrink-0">
                        <div className="relative group aspect-[2/3] rounded-lg overflow-hidden">
                            <Image src={story.image} alt={`Story by ${story.name}`} fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                            <p className="absolute bottom-2 left-2 text-white text-xs font-semibold">{story.name}</p>
                        </div>
                    </div>
                  ))}
                </div>
              </div>
          </Card>

          {/* Post Creator */}
          <Card>
            <form onSubmit={handleCreatePost}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                          <AvatarImage src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop" />
                          <AvatarFallback>WP</AvatarFallback>
                      </Avatar>
                      <Textarea 
                          placeholder="Share an update, Wesley..." 
                          className="bg-muted border-none focus-visible:ring-1 focus-visible:ring-ring"
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                      />
                  </div>
                  <div className="flex justify-between mt-4 pt-4 border-t">
                      <div className="flex gap-2">
                        <Button type="button" variant="ghost" size="sm"><Camera className="h-5 w-5 mr-2 text-green-500" />Photo/Video</Button>
                        <Button type="button" variant="ghost" size="sm"><Briefcase className="h-5 w-5 mr-2 text-blue-500" />Job Post</Button>
                        <Button type="button" variant="ghost" size="sm"><GraduationCap className="h-5 w-5 mr-2 text-yellow-500" />Memory</Button>
                      </div>
                      <Button type="submit" disabled={!newPostContent.trim()}>Post</Button>
                  </div>
                </CardContent>
            </form>
          </Card>

          {/* Feed Posts */}
          <div className="space-y-6">
              {feedItems.map(item => (
                  <FeedPost 
                    key={item.id} 
                    item={item} 
                    onLike={() => handleLike(item.id)} 
                    onComment={(text) => handleComment(item.id, text)}
                  />
              ))}
          </div>
        </main>

        {/* Right Sidebar - Desktop */}
        <aside className="hidden lg:block col-span-3 py-4">
          <RightSidebarContent />
        </aside>

        {/* Mobile Sidebars in Sheets */}
        <div className="lg:hidden">
              <Sheet>
                  <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="fixed top-16 left-2 z-40 bg-background/80 rounded-full">
                          <Menu />
                      </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-3/4 sm:w-1/2 p-4 pt-16">
                      <LeftSidebarContent />
                  </SheetContent>
              </Sheet>
              <Sheet>
                  <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="fixed top-16 right-2 z-40 bg-background/80 rounded-full">
                          <Users />
                      </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-3/4 sm:w-1/2 p-4 pt-16">
                      <RightSidebarContent />
                  </SheetContent>
              </Sheet>
        </div>

      </div>
    </div>
  );
}
