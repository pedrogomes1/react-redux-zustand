import { useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Module } from "../components/Module";
import { useStore } from "../zustand-store";
// import { useAppDispatch, useAppSelector } from "../store";
// import { loadCourse, start } from "../store/slices/player";

export function Player() {
  //It is important to return only the infos that you will use.
  //If not, useStore will listen to all of states, and not only the specifics info
  const { load, course } = useStore((state) => ({
    load: state.load,
    course: state.course,
  }));

  /* ---- REDUX MODE
     const dispatch = useAppDispatch();
     const modules = useAppSelector((state) => state.player.course?.modules);

     useEffect(() => {
       dispatch(loadCourse());
     }, []);
  */

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />
          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" />
            Deixar feedback
          </button>
        </div>

        <main className="relative pr-80 flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow">
          <div className="flex-1">
            <Video />
          </div>
          <aside className="w-80 absolute top-0 bottom-0 divide-y-2 divide-zinc-900 right-0 overflow-y-scroll border-l border-zinc-800 bg-zinc-900 scrollbar scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {course?.modules.map((module, index) => (
              <Module
                key={module.id}
                title={module.title}
                amountOfLessons={module.lessons.length}
                moduleIndex={index}
              />
            ))}
          </aside>
        </main>
      </div>
    </div>
  );
}
