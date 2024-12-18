export interface Location {
  longitude: number;
  latitude: number;
  height: number;
  name: string;
  modelUri: string;
}

export interface Education {
  school: string;
  degree: string;
  major: string;
  period: string;
  location: Location;
}

export interface WorkExperience {
  company: string;
  position: string;
  period: string;
  responsibilities: string[];
  location: Location;
}

export interface PersonalInfo {
  name: string;
  title: string;
  skills: string[];
  email: string;
  location: Location;
}