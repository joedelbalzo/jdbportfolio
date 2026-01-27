import { useEffect } from "react";

function DjangoVsExpress() {
  useEffect(() => {
    // Backup existing metadata values
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]').content;
    const originalKeywords = document.querySelector('meta[name="keywords"]').content;

    // Update metadata dynamically for this blog post
    document.title = "Django vs. Express and Postgres: A Totally Different Path";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription)
      metaDescription.content =
        "Reflecting on some of the immediate differences I noticed between running the Node.js/Express/Postgres stack I've become used to and running my first Django app.";

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords)
      metaKeywords.content =
        "software design, Backend, back end, python, django, express, node, postgres, postgresql, js, javascript, typescript";

    // Cleanup function to restore original metadata
    return () => {
      document.title = originalTitle;
      if (metaDescription) metaDescription.content = originalDescription;
      if (metaKeywords) metaKeywords.content = originalKeywords;
    };
  }, []);

  return (
    <article className="blogposts">
      <header>
        <h1>Django vs. Express + Postgres: A Different Path to Your Full-Stack App</h1>
        <p>Reflections on setting up my Python/Django backend compared to the Node.js/Express/Postgres stacks I've built before.</p>
        <p className="date">December 9, 2024</p>
      </header>
      <section>
        <h2>The Out-of-the-Box Experience</h2>
        <p>
          When I first started building JavaScript-based projects, I leaned heavily on the PERN stack: Postgres, Express, React, and Node.
          Setting up a simple server meant running <code>npm init</code> to generate a <code>package.json</code>, adding Express, installing
          PostgreSQL locally, and then bringing in an ORM like Sequelize if I wanted to avoid writing raw SQL. The baseline experience was
          always: choose your packages and structure your directories however you like. Nothing enforced a particular pattern, and while
          that freedom can be powerful, it can also leave you wondering if you missed a best practice.
        </p>
        <p>
          Django, on the other hand, gives you a more opinionated, batteries-included approach from the start. Instead of a{" "}
          <code>package.json</code>, you have a <code>settings.py</code> file containing an <code>INSTALLED_APPS</code> list. This list
          controls which applications and components are active in your project—Django’s ORM, the admin panel, and any third-party packages
          you’ve added. No need to manually require or import everything in a particular order; adding a line to <code>INSTALLED_APPS</code>{" "}
          is enough to integrate major functionality into your environment.
        </p>

        <h2>Folder Structure and Built-In Tools</h2>
        <p>
          A typical Express/Postgres project might start with a single <code>server.js</code> file and a handful of directories: maybe a{" "}
          <code>routes</code> folder, a <code>models</code> folder, and a <code>db</code> folder. With Sequelize or a similar ORM, you end
          up with a separate migrations directory, configuration files, and a place to define models.
        </p>
        <p>
          Django projects begin with <code>django-admin startproject</code>, which immediately creates a project folder and a highly
          structured setup: a directory for your top-level configuration, a <code>manage.py</code> file for administrative commands, and a
          logical pattern to create "apps"—modular components of your project each containing <code>models.py</code>, <code>views.py</code>,{" "}
          <code>urls.py</code>, and so forth. This structure is consistent across Django projects, reducing ambiguity and steering you
          toward a predictable layout.
        </p>
        <p>
          One of the most impactful differences is the Django Admin. Without writing a line of code for your own admin interface, you get a
          fully functional web UI to manage your database entries. Compare that to Express: if you want an admin dashboard, you’ll probably
          code it from scratch or rely on a third-party service.
        </p>

        <h2>Database Migrations vs. Seeds</h2>
        <p>
          In PERN setups, a common workflow involves manually creating database migrations and using <code>sequelize-cli</code> to run them.
          For seeding initial data, you might have a <code>seed.js</code> script that you run with <code>npm run seed</code>. This can be
          powerful, but it’s also another layer of decisions: how do I structure these scripts? Which CLI arguments are needed?
        </p>
        <p>Django’s approach simplifies these steps with built-in commands. After defining or changing your models, you run:</p>
        <pre className="code-block">
          <code>python manage.py makemigrations</code>
        </pre>
        <p>This inspects your model definitions and creates migration files automatically. Then:</p>
        <pre className="code-block">
          <code>python manage.py migrate</code>
        </pre>
        <p>
          applies these changes to your database. You no longer need to think, "Should I write raw SQL or a custom migration file?" Django’s
          ORM and migration system handle the heavy lifting.
        </p>
        <p>
          Data seeding can be approached by writing a custom management command or fixtures. Though not as one-liner simple as Sequelize’s
          <code>syncAndSeed()</code> pattern, Django provides a straightforward, consistent approach to schema changes and data loading.
        </p>

        <h2>Dependency Management and Commands</h2>
        <p>In a Node.js/Express/Postgres project, you manage dependencies via NPM. If you need an ORM, you add it:</p>
        <pre className="code-block">
          <code>npm install sequelize pg pg-hstore</code>
        </pre>
        <p>
          Then you configure connections and models manually. You rely on community scripts for migrations and seeding, and you might have
          multiple commands in <code>package.json</code> to run dev mode, test mode, and so forth.
        </p>
        <p>With Django, installing a package often just means:</p>
        <pre className="code-block">
          <code>pip install djangorestframework</code>
        </pre>
        <p>
          Then you add `'rest_framework'` to `INSTALLED_APPS` and you’re off to the races. The Django command{" "}
          <code>manage.py runserver</code> runs your development server, <code>manage.py test</code> runs your tests,{" "}
          <code>manage.py makemigrations</code> and
          <code>manage.py migrate</code> handle schema changes—all built-in commands provided out of the box. You do less internal wiring
          and can rely on a consistent, documented pattern for these tasks.
        </p>

        <h2>Dev Experience: Strict vs. Flexible</h2>
        <p>
          With Express and Postgres, you start with a blank slate and build upwards. This is empowering if you know exactly what you want
          and how to achieve it. You choose your ORM, router libraries, authentication middleware, and so forth.
        </p>
        <p>
          Django is more opinionated. It enforces a certain structure, naming conventions, and ways of doing things. Initially, this might
          feel restrictive—especially if you’re used to the freedom of Node.js and Express. But that opinionation can become a strength:
          once you internalize Django’s approach, spinning up a new project with a reliable structure and strong defaults is quick and easy.
        </p>

        <h2>CORS and Deployment Details</h2>
        <p>
          One subtle difference is how you serve your frontend and backend during development. In a PERN environment, you might eventually
          serve your React build from the same Express server, resulting in a single origin. This means fewer CORS headaches.
        </p>
        <p>
          In the Django + Next.js scenario, you start by running two separate servers (Django at 8000, Next.js at 3000). That introduces
          cross-origin requests. Hence, the need for `django-cors-headers` and configuring allowed origins. With PERN and a consolidated
          environment, CORS issues often vanish once you serve the frontend from the same origin as the backend.
        </p>

        <h2>Conclusions</h2>
        <p>
          Transitioning from a PERN stack to a Django + Next.js setup means embracing new defaults and more out-of-the-box tooling. Django’s
          built-in ORM and admin panel, `INSTALLED_APPS` configuration, and `manage.py` commands replace the manual wiring of ORMs and
          migrations you’d do in a Node/Express environment.
        </p>
        <p>
          Instead of editing package.json scripts and writing manual migrations or seeding scripts, you rely on Django’s automatic migration
          tools. Instead of building your own admin dashboard, you get one by default. Instead of dealing with raw SQL or a third-party ORM
          configured from scratch, Django gives you model definitions that integrate seamlessly with migrations and queries.
        </p>
        <p>
          In a PERN world, you have near-complete freedom but more housekeeping overhead. In Django, you trade some flexibility for speed,
          convention, and built-in best practices. By understanding these differences, you can pick the right tool for the job—and
          appreciate the subtle shifts in mindset each framework demands.
        </p>
      </section>
    </article>
  );
}

export default DjangoVsExpress;
