"use client";

export default function AccessCode() {
  return (
    <div className="space-y-4 bg-slate-200 p-4 mt-2 mb-3 rounded dark:text-white dark:bg-slate-800">
      <p>
        😀 使用前请打开设置填写 API Key (必需支持 gpt-4.0-vision-preview 模型)。
      </p>
      <p>🆒 已支持 Gemini 识图模型免费使用，在设置中切换为 Gemini 模式即可。</p>
      <p>
        🎉 每日提供 <strong>$2</strong> 公用额度 (OpenAI)
        免费使用，需要更多额度请前往{" "}
        <a
          className=" text-cyan-600 font-bold"
          href="https://shop.taoist.fun/buy/54"
          target="__blank">
          此处获取
        </a>{" "}
        。
      </p>
      <p>交流群：634323049，支持代搭建同款网站</p>
    </div>
  );
}
