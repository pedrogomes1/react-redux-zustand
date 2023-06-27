import { describe, expect, it } from "vitest";
import { player as reducer, next, play, PlayerState } from "./player";

const exampleState: PlayerState = {
  course: {
    id: 1,
    modules: [
      {
        id: 1,
        title: "Iniciando com react",
        lessons: [
          {
            id: "v=ZzGTTx2FtT8",
            title: "Fundamentos do Redux",
            duration: "15:30",
          },
          {
            id: "v=SVQz6xGCTKM",
            title: "Fundamentos do Redux2",
            duration: "15:30",
          },
        ],
      },
      {
        id: 2,
        title: "Estruturação",
        lessons: [
          {
            id: "v=ZzGTTx2FtT8",
            title: "Test",
            duration: "05:30",
          },
        ],
      },
    ],
  },
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: false,
};

describe("player slice", () => {
  it("should be able to play", () => {
    const state = reducer(exampleState, play([1, 2]));

    expect(state.currentModuleIndex).toEqual(1);
    expect(state.currentLessonIndex).toEqual(2);
  });

  it("should be able to play next video automatically", () => {
    const state = reducer(exampleState, next());

    expect(state.currentModuleIndex).toEqual(0);
    expect(state.currentLessonIndex).toEqual(1);
  });

  it("should not update the current module and lesson index if there is no next lesson available", () => {
    const state = reducer(
      {
        ...exampleState,
        currentLessonIndex: 1,
        currentModuleIndex: 1,
      },
      next()
    );

    expect(state.currentModuleIndex).toEqual(1);
    expect(state.currentLessonIndex).toEqual(1);
  });
});
