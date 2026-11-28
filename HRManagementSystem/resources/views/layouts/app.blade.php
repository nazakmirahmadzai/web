
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>@yield('title', 'Karwan University')</title>

    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet">

    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
          rel="stylesheet">

    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
        }

        /* University Banner */
        .university-banner {
            width: 100%;
            height: 170px;
            overflow: hidden;
        }

        .university-banner img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            display: block;
        }

        /* Navigation */
        .navbar {
            background-color: #082b55;
        }

        .navbar .nav-link {
            color: white !important;
            font-weight: 500;
            padding: 12px 16px;
        }

        .navbar .nav-link:hover {
            color: #ffc107 !important;
        }

        .navbar .dropdown-menu {
            border-radius: 0;
        }

        .login-btn {
            background-color: #ffc107;
            color: #082b55;
            font-weight: bold;
            border-radius: 5px;
        }

        .login-btn:hover {
            background-color: #e0a800;
            color: #082b55;
        }

        /* Mobile */
        @media (max-width: 768px) {
            .university-banner {
                height: 100px;
            }

            .navbar .nav-link {
                padding: 8px 10px;
            }
        }
    </style>

    @yield('styles')
</head>

<body>

    <!-- Small University Header Banner -->
    <header class="university-banner">
        <img src="{{ asset('images/karwan-banner.png') }}"
             alt="Karwan University">
    </header>

    <!-- Navigation Menu Below Banner -->
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid px-lg-4">

            <button class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarMenu">

                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarMenu">

                <ul class="navbar-nav me-auto">

                    <li class="nav-item">
                        <a class="nav-link" href="/">
                            <i class="bi bi-house-fill"></i> Home
                        </a>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle"
                           href="#"
                           data-bs-toggle="dropdown">
                            About Us
                        </a>

                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">About University</a></li>
                            <li><a class="dropdown-item" href="#">Mission & Vision</a></li>
                            <li><a class="dropdown-item" href="#">Administration</a></li>
                        </ul>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle"
                           href="#"
                           data-bs-toggle="dropdown">
                            Academics
                        </a>

                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Faculties</a></li>
                            <li><a class="dropdown-item" href="#">Departments</a></li>
                            <li><a class="dropdown-item" href="#">Programs</a></li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#">Admissions</a>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle"
                           href="#"
                           data-bs-toggle="dropdown">
                            Students
                        </a>

                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Student Services</a></li>
                            <li><a class="dropdown-item" href="#">Student Affairs</a></li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#">Research</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#">News & Events</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#">Contact</a>
                    </li>

                </ul>

                <a href="{{ route('login') }}"
                   class="btn login-btn px-4">

                    <i class="bi bi-person-circle"></i>
                    Login
                </a>

            </div>
        </div>
    </nav>

    <!-- Page Content -->
    <main>
        @yield('content')
    </main>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    @yield('scripts')

</body>
</html>
