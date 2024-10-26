
import { Beaker, Book, BookOpen, Calculator, Cpu, Dumbbell, Heart, Laptop, Music, Palette, Trophy, Users, Wrench } from "lucide-react";


export enum DepartmentEnum {
  MATHEMATICS = "Mathematics",
  SCIENCE = "Science",
  ENGLISH = "English",
  SOCIAL_STUDIES = "Social Studies",
  FOREIGN_LANGUAGES = "Foreign Languages",
  PHYSICAL_EDUCATION = "Physical Education",
  HEALTH = "Health",
  ART = "Art",
  MUSIC = "Music",
  TECHNOLOGY = "Technology",
  COMPUTER_SCIENCE = "Computer Science",
  SPECIAL_EDUCATION = "Special Education",
  VOCATIONAL_STUDIES = "Vocational Studies",
  LIBRARY = "Library",
  COUNSELING = "Counseling",
  ATHLETICS = "Athletics",
}

export const departments = [
  { name: "Mathematics", icon: Book },
  { name: "Science", icon: Beaker },
  { name: "English", icon: Music },
  { name: "Social Studies", icon: Palette },
  { name: "Foreign Languages", icon: Calculator },
  { name: "Physical Education", icon: Dumbbell },
  { name: "Health", icon: Users },
  { name: "Art", icon: Palette },
  { name: "Music", icon: Music },
  { name: "Technology", icon: Cpu },
  { name: "Computer Science", icon: Laptop },
  { name: "Special Education", icon: Heart },
  { name: "Vocational Studies", icon: Wrench },
  { name: "Library", icon: BookOpen },
  { name: "Counseling", icon: BookOpen },
  { name: "Athletics", icon: Trophy }
];

