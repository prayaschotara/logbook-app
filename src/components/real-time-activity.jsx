import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function RealTimeActivityWidget({ activities }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-time Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center mb-4">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={`/placeholder.svg?text=${activity.user.charAt(0)}`}
                  alt={activity.user}
                />
                <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <p className="text-sm font-medium">{activity.user}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.action}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
