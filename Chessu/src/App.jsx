import Game from "./components/Game";

export default function App() {
  return (
    <div className="relative min-h-screen flex justify-center overflow-hidden">
      <div
        className="absolute -z-10 inset-0 h-full w-full bg-[#1F1F1F] bg-[linear-gradient(to_right,#FFFFFF10_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF10_1px,transparent_1px)] bg-[size:24px_24px]"
      ></div>
      <Game />
    </div>
  )
}