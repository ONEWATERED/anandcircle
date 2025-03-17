
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, GraduationCap, Clock } from 'lucide-react';
import { Course } from '@/data/courseData';

interface CourseCardProps {
  course: Course;
  icon: React.ReactNode;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, icon }) => {
  // Use the icon prop passed from parent component
  return (
    <Card className="neo-glass border-0 overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
      <div className={`h-2 w-full bg-gradient-to-r ${course.color}`}></div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
            <CardDescription className="mt-2 text-xs">
              <span className="inline-flex items-center mr-3">
                <Users className="mr-1 h-3 w-3" /> {course.students} students
              </span>
              <span className="inline-flex items-center">
                <GraduationCap className="mr-1 h-3 w-3" /> {course.difficulty}
              </span>
            </CardDescription>
          </div>
          <div className="rounded-full p-2 bg-muted">{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{course.description}</p>
        <div className="mt-4 inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-full bg-muted">
          Duration: {course.duration}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-2">
        <Button className={`w-full bg-gradient-to-r ${course.color} text-white`}>
          View Course Details
        </Button>
        <div className="flex items-center justify-center w-full gap-2 text-sm text-amber-600 font-medium">
          <Clock className="h-4 w-4" />
          Coming Soon
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
