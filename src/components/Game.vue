<script>
import {
  moveCell,
  checkBoardState,
  moveUp,
  moveRight,
  moveLeft,
  moveDown,
} from "../lib/board";

export default {
  props: ["board", "playing"],

  methods: {
    moveCell,
    moveUp,
    moveRight,
    moveLeft,
    moveDown,

    cellClick(index, board) {
      if (this.playing) {
        this.moveCell(index, board);
        if (checkBoardState(board)) this.$emit("win");
      }
    },
  },
};
</script>

<template>
  <div class="field">
    <div
      v-for="(cellNumber, index) in board.cells"
      :key="cellNumber"
      class="cell"
      @click="cellClick(index, board)"
      @keypress.down="moveDown"
      :class="{ empty: cellNumber === 0, correct: cellNumber === index + 1 }"
    >
      <div v-if="cellNumber > 0" class="number">{{ cellNumber }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/main.scss";
.field {
  display: grid;
  gap: 2px;
  grid-template-columns: repeat(4, 1fr);
  width: 50%;
}

.cell {
  flex-basis: calc(50vw / 5);
  height: calc(50vw / 5);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $secondary-bg;
  border-radius: 2px;
  &.empty {
    background-color: $primary;
  }
  &.correct {
    background-color: $success;
    color: $secondary;
  }
}

@media (min-width: 750px) {
  .cell-container {
    width: 40vw;
    padding: 5px;
  }

  .cell {
    flex-basis: calc(40vw / 5);
    height: calc(40vw / 5);
    cursor: pointer;
    &.empty {
      background-color: $primary;
    }
    &.correct {
      background-color: $success;
      color: $primary;
    }
  }
}
</style>
