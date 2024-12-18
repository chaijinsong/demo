import { Education, WorkExperience, PersonalInfo } from '../types';

export const personalInfo: PersonalInfo = {
  name: "李白",
  title: "全栈开发工程师",
  skills: ["React", "Node.js", "Python", "TypeScript"],
  email: "example@email.com",
  location: {
    longitude: 116.3912757,
    latitude: 39.906217,
    height: 50000, // Reduced height for better visibility
    name: "北京",
    modelUri: "http://localhost:5173/public/models/girl.glb"
  }
};

export const education: Education[] = [
  {
    school: "武汉大学",
    degree: "本科",
    major: "计算机科学与技术",
    period: "2014-2018",
    location: {
      longitude: 114.3671112,
      latitude: 30.5412196,
      height: 50000,
      name: "武汉",
      modelUri: "/public/models/girl.glb"
    }
  }
];

export const workExperience: WorkExperience[] = [
  {
    company: "百度",
    position: "高级开发工程师",
    period: "2021-至今",
    responsibilities: [
      "负责核心业务系统的架构设计和开发",
      "带领团队完成多个重要项目"
    ],
    location: {
      longitude: 116.3079,
      latitude: 40.0563,
      height: 50000,
      name: "北京中关村软件园",
      modelUri: "/public/models/girl.glb"
    }
  },
  {
    company: "腾讯",
    position: "开发工程师",
    period: "2018-2021",
    responsibilities: [
      "参与核心产品开发",
      "负责性能优化"
    ],
    location: {
      longitude: 116.4859,
      latitude: 39.9146,
      height: 50000,
      name: "北京望京SOHO",
      modelUri: "/public/models/girl.glb"
    }
  }
];