import { Education, WorkExperience, PersonalInfo } from '../types';

export const personalInfo: PersonalInfo = {
  name: "李白",
  title: "全栈开发工程师",
  skills: [
    "React",
    "Node.js",
    "Python",
    "TypeScript",
    "GraphQL",
    "Docker",
    "Kubernetes",
    "MongoDB",
    "MySQL",
    "Redis"
  ],
  email: "libai.developer@email.com",
  phone: "138-8888-8888",
  github: "https://github.com/libai",
  linkedin: "https://www.linkedin.com/in/libai",
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
    gpa: 3.8,
    achievements: [
      "全国大学生计算机设计大赛一等奖",
      "主导开发校内选课系统重构，优化性能提升20%",
      "连续两年获得校级一等奖学金"
    ],
    location: {
      longitude: 114.3671112,
      latitude: 30.5412196,
      name: "武汉",
      modelUri: "/public/models/girl.glb",
      height: 10000
    }
  },
  {
    school: "清华大学（短期交换）",
    degree: "访学",
    major: "人工智能与深度学习",
    period: "2017-2018",
    gpa: 4.0,
    achievements: [
      "参与机器学习模型优化项目",
      "与实验室合作发表一篇会议论文（ICML 2018）"
    ],
    location: {
      longitude: 116.3269,
      latitude: 39.9888,
      name: "北京",
      modelUri: "",
      height: 10000
    }
  }
];

export const workExperience: WorkExperience[] = [
  {
    company: "百度",
    position: "高级开发工程师",
    period: "2021-至今",
    responsibilities: [
      "负责搜索广告平台的架构升级，支持日均千万级别的用户请求",
      "带领团队开发智能推荐系统，CTR预估精度提升5%",
      "设计并实现前后端分离架构，提升开发效率30%",
      "参与公司开源项目 `PaddlePaddle` 的维护和功能扩展"
    ],
    achievements: [
      "获得百度“明星员工”称号",
      "申请并获批2项发明专利"
    ],
    location: {
      longitude: 116.3079,
      latitude: 40.0563,
      name: "北京中关村软件园",
      modelUri: "/public/models/baidu-building.glb",
      height: 10000
    }
  },
  {
    company: "腾讯",
    position: "开发工程师",
    period: "2018-2021",
    responsibilities: [
      "负责微信小程序框架优化，支持日活亿级用户",
      "设计并实现多端统一的权限控制系统，提升安全性",
      "参与企业级文件管理平台的开发，优化性能及安全机制"
    ],
    achievements: [
      "推动核心功能上线后，用户满意度提高10%",
      "年度绩效考核A+"
    ],
    location: {
      longitude: 116.4859,
      latitude: 39.9146,
      name: "北京望京SOHO",
      modelUri: "/public/models/tencent-building.glb",
      height: 10000
    }
  },
  {
    company: "华为（实习）",
    position: "软件开发实习生",
    period: "2017-2018",
    responsibilities: [
      "参与云服务平台的核心模块开发，完成弹性扩展功能",
      "编写高效的API接口，实现多语言支持",
      "优化项目部署流程，将部署时间减少40%"
    ],
    achievements: [
      "实习结束后获得全职Offer",
      "提出的优化方案被团队采纳，节省公司资源"
    ],
    location: {
      longitude: 113.9458,
      latitude: 22.5465,
      name: "深圳南山科技园",
      modelUri: "/public/models/huawei-building.glb",
      height: 10000
    }
  }
];
