<template>
  <header class="p-1 border">
    <nav class="navbar-expand-lg navbar">
      <div class="container d-flex justify-content-between">
        <div>
          <router-link class="nav-link" to="/">
            <img src="@/assets/images/Logo-desktop.png" alt="LOGO" />
          </router-link>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item text-end">
              <router-link class="nav-link" to="/attractions"
                >探索景點</router-link
              >
            </li>
            <li class="nav-item text-end">
              <router-link class="nav-link" to="/activitys"
                >節慶活動</router-link
              >
            </li>
            <li class="nav-item mb-3 mb-lg-0 text-end">
              <router-link class="nav-link" to="foods"> 品嘗美食</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { Collapse } from "bootstrap";

export default {
  props: {},

  mounted() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarNav");
    const bsCollapse = new Collapse(menuToggle, {
      toggle: false,
    });
    navLinks.forEach((l) => {
      l.addEventListener("click", () => {
        bsCollapse.toggle();
      });
    });
  },
};
</script>
