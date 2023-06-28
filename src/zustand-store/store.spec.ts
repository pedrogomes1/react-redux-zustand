import { beforeEach, describe, expect, it } from "vitest";
import { useStore as store } from ".";

const course = {
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
};

const initialState = store.getState();

describe("player slice", () => {
  beforeEach(() => {
    store.setState(initialState);
  });

  it("should be able to play", () => {
    const { play } = store.getState();

    play([1, 2]);

    const { currentModuleIndex, currentLessonIndex } = store.getState();

    expect(currentModuleIndex).toEqual(1);
    expect(currentLessonIndex).toEqual(2);
  });

  it("should be able to play next video automatically", () => {
    store.setState({ course });

    const { next } = store.getState();

    next();

    const { currentModuleIndex, currentLessonIndex } = store.getState();

    expect(currentModuleIndex).toEqual(0);
    expect(currentLessonIndex).toEqual(1);
  });

  it("should be able to jump to the next module automatically", () => {
    store.setState({ course });

    const { next } = store.getState();

    store.setState({ currentLessonIndex: 1 });

    next();

    const { currentModuleIndex, currentLessonIndex } = store.getState();

    expect(currentModuleIndex).toEqual(1);
    expect(currentLessonIndex).toEqual(0);
  });

  it("should not update the current module and lesson index if there is no next lesson available", () => {
    store.setState({ course });

    const { next } = store.getState();

    store.setState({ currentLessonIndex: 1, currentModuleIndex: 1 });

    next();

    const { currentModuleIndex, currentLessonIndex } = store.getState();

    expect(currentModuleIndex).toEqual(1);
    expect(currentLessonIndex).toEqual(1);
  });
});
