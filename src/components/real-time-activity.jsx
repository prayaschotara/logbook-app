import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/config/supabase";
import { useEffect, useState } from "react";

export default function RealTimeActivityWidget() {
  const [activities, setActivities] = useState([]);
  supabase
    .channel("custom-insert-channel")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "activities" },
      (payload) => {
        const { new: activity } = payload;
        let temp = [...activities, activity];
        temp.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setActivities(temp);
      }
    )
    .subscribe();

  const getPreviousActivities = async () => {
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);
    setActivities(data);
    if (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPreviousActivities();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-time Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <div key={index} className="flex items-center mb-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={`/placeholder.svg?text=${activity?.person_name?.charAt(
                      0
                    )}`}
                    alt={activity?.person_name}
                  />
                  <AvatarFallback>
                    {activity?.person_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <p className="text-sm font-medium">{activity?.person_name}</p>
                  <p className="text-sm text-muted-foreground">
                    Added a new logbook entry
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(activity?.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No activities yet</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
