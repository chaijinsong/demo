import CesiumGlobe from '../components/CesiumGlobe';
import ResumeCard from '../components/ResumeCard';

interface Frame5Props {
  onReset: () => void;
}

export default function Frame5({ onReset }: Frame5Props) {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center space-y-6 px-8">
        <ResumeCard title="个人成就" className="animate-slideIn">
          <ul className="list-disc list-inside">
            <li>主导完成多个大型项目的架构设计和开发</li>
            <li>获得优秀员工称号</li>
            <li>在技术社区发表多篇技术文章</li>
          </ul>
        </ResumeCard>
        <ResumeCard title="自我评价" className="animate-slideIn delay-300">
          <p>
            热爱技术，善于学习，具有强烈的责任心和团队协作精神。
            擅长解决复杂问题，注重代码质量和性能优化。
            期待能在新的环境中继续成长，创造更大的价值。
          </p>
          <button
            onClick={onReset}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
          >
            返回首页
          </button>
        </ResumeCard>
      </div>
      <div className="w-1/2 relative">
        <CesiumGlobe />
      </div>
    </div>
  );
}