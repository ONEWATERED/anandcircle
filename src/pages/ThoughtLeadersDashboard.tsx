
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Plus, RefreshCw, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import LeadersList from '@/components/thought-leaders/LeadersList';
import LeaderFormDialog from '@/components/thought-leaders/LeaderFormDialog';
import { ThoughtLeader, SocialLink } from '@/types/thought-leaders';

const ThoughtLeadersDashboard = () => {
  const [leaders, setLeaders] = useState<ThoughtLeader[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLeader, setEditingLeader] = useState<ThoughtLeader | null>(null);
  const [syncingWithFrontend, setSyncingWithFrontend] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch leaders from database
  const fetchLeaders = async () => {
    setIsLoading(true);
    try {
      // Fetch leaders
      const { data: leadersData, error: leadersError } = await supabase
        .from('thought_leaders')
        .select('*')
        .order('category')
        .order('order_position', { nullsLast: true })
        .order('name');

      if (leadersError) throw leadersError;

      // Fetch social links for all leaders
      const { data: socialLinksData, error: socialLinksError } = await supabase
        .from('thought_leader_social_links')
        .select('*');

      if (socialLinksError) throw socialLinksError;

      // Combine data
      const leadersWithLinks = leadersData.map(leader => {
        const leaderSocialLinks = socialLinksData
          .filter(link => link.leader_id === leader.id)
          .map(link => ({ 
            platform: link.platform as 'instagram' | 'youtube' | 'twitter', 
            url: link.url 
          }));
        
        return {
          ...leader,
          socialLinks: leaderSocialLinks as SocialLink[]
        };
      });

      setLeaders(leadersWithLinks);
    } catch (error) {
      console.error('Error fetching thought leaders:', error);
      toast({
        title: 'Error',
        description: 'Failed to load thought leaders',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load leaders on initial mount
  useEffect(() => {
    fetchLeaders();
  }, []);

  // Filter leaders based on active tab
  const filteredLeaders = activeTab === 'all' 
    ? leaders 
    : leaders.filter(leader => leader.category === activeTab);

  // Open form for adding a new leader
  const handleAddLeader = () => {
    setEditingLeader(null);
    setIsFormOpen(true);
  };

  // Open form for editing a leader
  const handleEditLeader = (leader: ThoughtLeader) => {
    setEditingLeader(leader);
    setIsFormOpen(true);
  };

  // Delete a leader
  const handleDeleteLeader = async (id: string) => {
    try {
      const { error } = await supabase
        .from('thought_leaders')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Thought leader deleted successfully'
      });
      
      // Refresh leaders list
      fetchLeaders();
    } catch (error) {
      console.error('Error deleting thought leader:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete thought leader',
        variant: 'destructive'
      });
    }
  };

  // Save a leader (create or update)
  const handleSaveLeader = async (leader: ThoughtLeader, socialLinks: SocialLink[]) => {
    try {
      // Add or update the leader
      const { data, error } = await supabase
        .from('thought_leaders')
        .upsert({
          id: leader.id,
          name: leader.name,
          role: leader.role,
          category: leader.category,
          image_url: leader.image_url,
          special: leader.special,
          relationship: leader.relationship,
          linkedin_url: leader.linkedin_url,
          order_position: leader.order_position
        })
        .select();

      if (error) throw error;

      // Delete existing social links for this leader
      const { error: deleteError } = await supabase
        .from('thought_leader_social_links')
        .delete()
        .eq('leader_id', leader.id);

      if (deleteError) throw deleteError;

      // Add new social links if any
      if (socialLinks && socialLinks.length > 0) {
        const socialLinksToInsert = socialLinks.map(link => ({
          leader_id: leader.id,
          platform: link.platform,
          url: link.url
        }));

        const { error: insertError } = await supabase
          .from('thought_leader_social_links')
          .insert(socialLinksToInsert);

        if (insertError) throw insertError;
      }

      toast({
        title: 'Success',
        description: 'Thought leader saved successfully'
      });

      // Close form and refresh list
      setIsFormOpen(false);
      fetchLeaders();
    } catch (error) {
      console.error('Error saving thought leader:', error);
      toast({
        title: 'Error',
        description: 'Failed to save thought leader',
        variant: 'destructive'
      });
    }
  };

  // Sync data with frontend connections
  const syncWithFrontend = async () => {
    setSyncingWithFrontend(true);
    try {
      // Get all updated leaders with their social links
      const { data: leadersData, error: leadersError } = await supabase
        .from('thought_leaders')
        .select('*')
        .order('category')
        .order('order_position', { nullsLast: true })
        .order('name');

      if (leadersError) throw leadersError;

      const { data: socialLinksData, error: socialLinksError } = await supabase
        .from('thought_leader_social_links')
        .select('*');

      if (socialLinksError) throw socialLinksError;

      // Convert to format expected by frontend
      const frontendConnections = leadersData.map(leader => {
        const leaderSocialLinks = socialLinksData
          .filter(link => link.leader_id === leader.id)
          .map(link => ({ 
            platform: link.platform as 'instagram' | 'youtube' | 'twitter', 
            url: link.url 
          }));
        
        return {
          id: leader.id,
          name: leader.name,
          role: leader.role,
          category: leader.category,
          image: leader.image_url,
          special: leader.special,
          relationship: leader.relationship,
          socialLinks: leaderSocialLinks.length > 0 ? leaderSocialLinks : undefined,
          linkedInUrl: leader.linkedin_url,
          order: leader.order_position
        };
      });

      // Save to localStorage for frontend components to use
      localStorage.setItem('connections', JSON.stringify(frontendConnections));

      toast({
        title: 'Success',
        description: 'Thought leaders synchronized with frontend'
      });
    } catch (error) {
      console.error('Error syncing with frontend:', error);
      toast({
        title: 'Error',
        description: 'Failed to sync with frontend',
        variant: 'destructive'
      });
    } finally {
      setSyncingWithFrontend(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Thought Leaders Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your connections, inspirations, and thought leaders
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={syncWithFrontend}
            disabled={syncingWithFrontend}
          >
            {syncingWithFrontend ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Sync with Frontend
          </Button>
          
          <Button onClick={handleAddLeader}>
            <Plus className="mr-2 h-4 w-4" />
            Add Leader
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Thought Leaders & Connections</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="family">Family</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="health">Health</TabsTrigger>
              <TabsTrigger value="politics">Politics</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <LeadersList 
                  leaders={filteredLeaders} 
                  onEdit={handleEditLeader} 
                  onDelete={handleDeleteLeader}
                />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {isFormOpen && (
        <LeaderFormDialog
          leader={editingLeader}
          onSave={handleSaveLeader}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default ThoughtLeadersDashboard;
