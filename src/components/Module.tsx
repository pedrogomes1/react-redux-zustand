import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { Lesson } from "./Lesson";
import { useStore } from "../zustand-store";
// import { useAppDispatch, useAppSelector } from "../store";
// import { play } from "../store/slices/player";

interface ModuleProps {
  title: string;
  amountOfLessons: number;
  moduleIndex: number;
}

export function Module({ title, amountOfLessons, moduleIndex }: ModuleProps) {
  /* ------ REDUX MODE
    const dispatch = useAppDispatch();

    const { currentLessonIndex, currentModuleIndex } = useAppSelector((state) => {
      const { currentLessonIndex, currentModuleIndex } = state.player;

      return { currentLessonIndex, currentModuleIndex };
    });

    function handlePlayLesson(moduleIndex: number, lessonIndex: number) {
      dispatch(play([moduleIndex, lessonIndex]));
    }

    const lessons = useAppSelector(
      (state) => state.player.course?.modules[moduleIndex].lessons
    );
  */

  const { lessons, currentLessonIndex, currentModuleIndex, play } = useStore(
    (state) => ({
      lessons: state.course?.modules[moduleIndex].lessons,
      currentLessonIndex: state.currentLessonIndex,
      currentModuleIndex: state.currentModuleIndex,
      play: state.play,
    })
  );

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <ChevronDown className="group-data-[state=open]:rotate-180 w-5 h-5 ml-auto text-zinc-400 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons &&
            lessons.map((lesson, lessonIndex) => {
              const isCurrent =
                currentModuleIndex === moduleIndex &&
                currentLessonIndex === lessonIndex;

              return (
                <Lesson
                  key={lesson.id}
                  title={lesson.title}
                  duration={lesson.duration}
                  onPlay={() => play([moduleIndex, lessonIndex])}
                  isCurrent={isCurrent}
                />
              );
            })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
