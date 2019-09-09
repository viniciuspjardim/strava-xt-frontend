<template>
  <div>
    <nav class="navbar navbar-expand-lg fixed-top navbar-transparent " color-on-scroll="300">
      <div class="container">
        <div class="navbar-translate">
          <router-link class="navbar-brand" to="/">Strava Vue</router-link>
          <button class="navbar-toggler navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navigation"
            aria-controls="navigation-index"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse justify-content-end" id="navigation">
          <ul class="navbar-nav">
            <app-nav-links></app-nav-links>
            <li class="nav-item">
              <a class="nav-link"
                rel="tooltip"
                title="Follow me on Instagram"
                data-placement="bottom"
                href="https://www.instagram.com/viniciuspjardim/"
                target="_blank">
                <i class="fa fa-instagram"></i>
                <p class="d-lg-none">Instagram</p>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link"
                rel="tooltip"
                title="Star on GitHub"
                data-placement="bottom"
                href="https://github.com/viniciuspjardim/strava-edit-frontend"
                target="_blank">
                <i class="fa fa-github"></i>
                <p class="d-lg-none">GitHub</p>
              </a>
            </li>
            <li class="nav-item">
              <app-login-button></app-login-button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="page-header section-dark"
      style="background-image: url('./assets/img/vinicius-jardim.jpg')">
      <div class="filter"></div>
      <div class="content-center">
        <div class="container">
          <div class="title-brand">
            <h1 class="presentation-title">Strava Vue</h1>
          </div>
          <h2 class="presentation-subtitle text-center">
            Edit and compare multiple activities from Strava
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavLinks from './NavLinks';
  import LoginButton from './LoginButton';

  export default {
    components: {
      appNavLinks: NavLinks,
      appLoginButton: LoginButton
    }
  }
</script>
