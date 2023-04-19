<script>
import "./assets/main.scss";
import { boardFactory, randomizeBoard } from "./lib/board.js";
import GameBoard from "./components/Game.vue";

export default {
  components: { GameBoard },
  data() {
    return {
      board: [],
      playing: false,
      started: false,
      time: 0,
      interval: null,
    };
  },
  methods: {
    startGame() {
      this.time = 0;
      clearInterval(this.interval);
      randomizeBoard(65, this.board);
      this.started = true;
      this.playing = true;
      this.interval = setInterval(this.incrementTimer, 100);
    },
    pauseHandler() {
      if (this.playing) {
        this.playing = false;
        clearInterval(this.interval);
      } else {
        this.playing = true;
        this.interval = setInterval(this.incrementTimer, 100);
      }
    },
    incrementTimer() {
      this.time++;
    },
    handleWin() {
      alert("You Win");
      this.started = false;
      this.playing = false;

      clearInterval(this.interval);
    },
  },
  mounted() {
    this.board = boardFactory(4);
  },
};
</script>

<template>
  <main class="main">
    <div class="toolbar">
      <span>Time: {{ time }}</span>
      <span>Moves: {{ board.moves }}</span>
    </div>
    <div class="game">
      <GameBoard @win="handleWin" :board="board" :playing="playing" />
      <div class="menu">
        <button @click="startGame" class="btn">New Game</button>
        <button v-if="started" @click="pauseHandler" class="btn">
          <span v-if="playing">Pause</span>
          <span v-else>Resume</span>
        </button>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@import "./assets/main.scss";
$color: black;
main {
  min-height: 100vh;
  height: fit-content;
  width: 100vw;
  background-color: $primary-bg;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.toolbar {
  display: flex;
  color: $primary;
  padding: 1rem;
  display: flex;
  width: 80%;
  * {
    margin: 1rem;
  }
}
.game {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
}
.menu {
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.btn {
  border: 0.1rem solid $primary;
  background-color: transparent;
  flex-basis: 50%;
  color: $primary;
  font-size: 0.6rem;
  margin: 1rem;
  cursor: pointer;
  transition: all .2s linear;

  &:hover {
    background-color: $success;
    transition: 0.3s ease;
  }
}
@media (min-width: 750px) {
  .btn {
    flex-basis: 20%;
    height: 40px;
    font-size: 1.2rem;
  }
}
</style>