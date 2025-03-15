
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { useForm } from 'react-hook-form';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  Heart, 
  Users, 
  Flag, 
  Briefcase, 
  Activity, 
  GraduationCap, 
  Instagram, 
  Youtube, 
  Twitter,
  ExternalLink,
  Edit,
  Trash2,
  Plus,
  Save,
  CheckCircle,
  Linkedin
} from 'lucide-react';
import { Person, SocialLink } from '@/types/connections';

const ConnectionsDashboard = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  
  const form = useForm<Person>({
    defaultValues: {
      id: '',
      name: '',
      category: 'family',
      role: '',
      image: '/placeholder.svg',
      special: false,
      relationship: '',
      socialLinks: [],
      linkedInUrl: ''
    }
  });
  
  // Load data from localStorage on component mount
  useEffect(() => {
    setLoading(true);
    try {
      const savedPeople = localStorage.getItem('connections');
      if (savedPeople) {
        setPeople(JSON.parse(savedPeople));
      } else {
        // Fetch from hardcoded data in FollowingSection.tsx when no data exists yet
        import('@/components/FollowingSection').then((module) => {
          // This assumes that the people array is exported from FollowingSection
          const { people: initialPeople } = module;
          if (initialPeople && Array.isArray(initialPeople)) {
            setPeople(initialPeople);
            localStorage.setItem('connections', JSON.stringify(initialPeople));
          }
        }).catch(error => {
          console.error('Failed to import FollowingSection data:', error);
          // Fallback to empty array
          setPeople([]);
        });
      }
    } catch (error) {
      console.error('Error loading connections data:', error);
      toast.error('Failed to load connections data');
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Save data to localStorage whenever people changes
  useEffect(() => {
    if (!loading && people.length > 0) {
      localStorage.setItem('connections', JSON.stringify(people));
    }
  }, [people, loading]);
  
  const handleOpenEditDialog = (person: Person) => {
    setSelectedPerson(person);
    form.reset(person);
    setIsDialogOpen(true);
  };
  
  const handleOpenNewPersonDrawer = () => {
    setSelectedPerson(null);
    form.reset({
      id: Date.now().toString(),
      name: '',
      category: 'family',
      role: '',
      image: '/placeholder.svg',
      special: false,
      relationship: '',
      socialLinks: [],
      linkedInUrl: ''
    });
    setIsDrawerOpen(true);
  };
  
  const handleDeletePerson = (personId: string) => {
    if (confirm('Are you sure you want to delete this person?')) {
      setPeople(prevPeople => prevPeople.filter(p => p.id !== personId));
      toast.success('Person deleted successfully');
    }
  };
  
  const onSubmit = (data: Person) => {
    if (selectedPerson) {
      // Update existing person
      setPeople(prevPeople => 
        prevPeople.map(p => p.id === selectedPerson.id ? data : p)
      );
      toast.success('Person updated successfully');
      setIsDialogOpen(false);
    } else {
      // Add new person
      setPeople(prevPeople => [...prevPeople, data]);
      toast.success('Person added successfully');
      setIsDrawerOpen(false);
    }
  };
  
  const filteredPeople = activeTab === 'all' 
    ? people 
    : people.filter(p => p.category === activeTab);
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'family':
        return <Heart className="h-4 w-4" />;
      case 'politics':
        return <Flag className="h-4 w-4" />;
      case 'business':
        return <Briefcase className="h-4 w-4" />;
      case 'health':
        return <Activity className="h-4 w-4" />;
      case 'learning':
        return <GraduationCap className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };
  
  return (
    <MainLayout>
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-display font-bold">Manage Connections</h1>
                <p className="text-muted-foreground mt-1">
                  Edit your family members and people you follow
                </p>
              </div>
              <Button onClick={handleOpenNewPersonDrawer}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Connection
              </Button>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-6 mb-8">
                <TabsTrigger value="all" className="text-sm">All</TabsTrigger>
                <TabsTrigger value="family" className="text-sm flex items-center gap-1">
                  <Heart className="h-3 w-3" /> Family
                </TabsTrigger>
                <TabsTrigger value="politics" className="text-sm flex items-center gap-1">
                  <Flag className="h-3 w-3" /> Politics
                </TabsTrigger>
                <TabsTrigger value="business" className="text-sm flex items-center gap-1">
                  <Briefcase className="h-3 w-3" /> Business
                </TabsTrigger>
                <TabsTrigger value="health" className="text-sm flex items-center gap-1">
                  <Activity className="h-3 w-3" /> Health
                </TabsTrigger>
                <TabsTrigger value="learning" className="text-sm flex items-center gap-1">
                  <GraduationCap className="h-3 w-3" /> Learning
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPeople.map(person => (
                    <Card key={person.id} className={`overflow-hidden hover:shadow-md transition-all ${
                      person.special ? 'border-primary/20 bg-primary/5 hover:border-primary/30' : ''
                    }`}>
                      <CardHeader className="p-4 pb-0 flex flex-row justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{person.name}</CardTitle>
                          <CardDescription>{person.role}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleOpenEditDialog(person)}
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeletePerson(person.id)}
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 flex flex-col items-center">
                        <Avatar className="h-24 w-24 mb-4 border-2 border-primary/20">
                          <AvatarImage src={person.image} alt={person.name} />
                          <AvatarFallback className="bg-muted">
                            {person.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        {person.relationship && (
                          <p className="text-sm italic text-primary/80 text-center">
                            "{person.relationship}"
                          </p>
                        )}
                        
                        <div className="mt-3 flex gap-2">
                          {person.category && (
                            <div className="badge bg-primary/10 text-primary text-xs py-1 px-2 rounded-full flex items-center gap-1">
                              {getCategoryIcon(person.category)}
                              <span className="capitalize">{person.category}</span>
                            </div>
                          )}
                          {person.special && (
                            <div className="badge bg-rose-100 text-rose-700 text-xs py-1 px-2 rounded-full flex items-center gap-1">
                              <Heart className="h-3 w-3 fill-rose-500" />
                              <span>Special</span>
                            </div>
                          )}
                        </div>
                        
                        {person.socialLinks && person.socialLinks.length > 0 && (
                          <div className="flex space-x-3 mt-3">
                            {person.socialLinks.map((link, index) => {
                              let icon;
                              switch (link.platform) {
                                case 'instagram':
                                  icon = <Instagram className="h-4 w-4" />;
                                  break;
                                case 'youtube':
                                  icon = <Youtube className="h-4 w-4" />;
                                  break;
                                case 'twitter':
                                  icon = <Twitter className="h-4 w-4" />;
                                  break;
                                default:
                                  icon = <ExternalLink className="h-4 w-4" />;
                              }
                              return (
                                <a 
                                  key={index} 
                                  href={link.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-muted-foreground hover:text-primary transition-colors"
                                  aria-label={`${link.platform} profile`}
                                >
                                  {icon}
                                </a>
                              );
                            })}
                            {person.linkedInUrl && (
                              <a 
                                href={person.linkedInUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="LinkedIn profile"
                              >
                                <Linkedin className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* Edit Person Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Connection</DialogTitle>
            <DialogDescription>
              Update details for {selectedPerson?.name}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        e.g., Son, Daughter, Mentor, Author
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <select 
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          {...field}
                        >
                          <option value="family">Family</option>
                          <option value="politics">Politics</option>
                          <option value="business">Business</option>
                          <option value="health">Health</option>
                          <option value="learning">Learning</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        URL to person's photo
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="special"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <input
                          type="checkbox"
                          className="h-4 w-4 mt-1"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Mark as Special
                        </FormLabel>
                        <FormDescription>
                          Highlight this person with special styling
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="linkedInUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://linkedin.com/in/username" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Separator />
              
              <FormField
                control={form.control}
                name="relationship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationship Description</FormLabel>
                    <FormControl>
                      <textarea 
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe your relationship or connection with this person
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Add New Person Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Add New Connection</DrawerTitle>
            <DrawerDescription>
              Add a new person to your connections
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="px-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <select 
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            {...field}
                          >
                            <option value="family">Family</option>
                            <option value="politics">Politics</option>
                            <option value="business">Business</option>
                            <option value="health">Health</option>
                            <option value="learning">Learning</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="special"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <input
                            type="checkbox"
                            className="h-4 w-4 mt-1"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Mark as Special
                          </FormLabel>
                          <FormDescription>
                            Highlight this person with special styling
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="linkedInUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://linkedin.com/in/username" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Separator />
                
                <FormField
                  control={form.control}
                  name="relationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship Description</FormLabel>
                      <FormControl>
                        <textarea 
                          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Describe your relationship or connection with this person
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DrawerFooter className="pt-2">
                  <Button type="submit" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Connection
                  </Button>
                </DrawerFooter>
              </form>
            </Form>
          </div>
        </DrawerContent>
      </Drawer>
    </MainLayout>
  );
};

export default ConnectionsDashboard;
