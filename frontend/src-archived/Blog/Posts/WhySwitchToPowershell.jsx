import { useEffect } from "react";

function WhySwitchToPowershell() {
  useEffect(() => {
    // Backup existing metadata values
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]').content;
    const originalKeywords = document.querySelector('meta[name="keywords"]').content;

    // Update metadata dynamically for this blog post
    document.title = "Why I Finally Switched To Powershell";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription)
      metaDescription.content =
        "After lots of attempts to run pip install and countless errors, I decided it was finally time to stop emulating a Mac/Bash setup and learn to love the bomb.";

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) metaKeywords.content = "software design, DJANGO, WINDOWS GITBASH, Unix, Mac, Bash, Powershell";

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
        <h1>Why I Finally To Switch To Powershell</h1>
        <p>Solving Django Path Issues on Windows and why Git Bash Struggles with Django</p>
        <p className="date">December 4, 2024</p>
      </header>
      <section>
        <h2>Why Git Bash Struggled with Django</h2>
        <p>
          When I started working on Domus, my first Django project, I expected to face challenges learning a new framework, but I didn’t
          expect my terminal to be one of them. I’ve been a loyal Git Bash user for years—it’s simple, lightweight, and gets the job done
          for Node.js and Git workflows. However, as soon as I tried to spin up a Django server, things went south.
        </p>
        <p>
          Commands like <code id="mid-paragraph-code">python manage.py runserver</code> either failed or behaved unpredictably. Path issues
          cropped up because Git Bash, while great for mimicking Unix environments, doesn’t handle Windows file paths as seamlessly. Even
          activating a virtual environment felt like a battle:
        </p>
        <pre className="code-block">
          <code>
            source venv/Scripts/activate {"   "}
            <span style={{ color: "#6bbc87" }}># This works on Unix but fails in Git Bash on Windows</span>
          </code>
        </pre>
        <p>
          After too many Googles and hours wasted tweaking commands, I knew I needed a terminal that played better with Windows. "Git bash
          is fake bash on Windows" is my favorite thing that I read. So, enter PowerShell.
        </p>

        <h2>Switching to PowerShell</h2>
        <p>
          Honestly, I didn't use PowerShell for the longest time because when I was learning to code and following along with teachers and
          classmates, the differences between Windows commands and Bash commands made it impossible to follow along. Now that I'm a few
          years into programming, maybe it's time to get in the game.
        </p>
        <pre className="code-block">
          <code>python -m venv venv</code>
        </pre>
        <p>Then, instead of struggling with Git Bash, I used PowerShell to activate it:</p>
        <pre className="code-block">
          <code>.\venv\Scripts\Activate</code>
        </pre>
        <p>
          That simple switch solved the issue. No more path errors, no more command failures. Running the Django server was as
          straightforward as:
        </p>
        <pre className="code-block">
          <code>python manage.py runserver</code>
        </pre>
        <p>
          PowerShell handled Windows-specific paths without any tweaks, and suddenly, I could focus on building Domus instead of debugging
          my tools.
        </p>

        <h2>Pro Tips for PowerShell and Django</h2>
        <p>If you’re switching from Git Bash, here are a few tips to make your transition smoother:</p>
        <ul>
          <li>
            <strong>Set PowerShell as your default terminal:</strong> In VSCode, go to <code id="mid-paragraph-code">Ctrl+Shift+P</code> →
            <code id="mid-paragraph-code">Terminal: Select Default Profile</code>, and choose PowerShell.
          </li>
          <li>
            <strong>Enable script execution:</strong> By default, PowerShell restricts running scripts. Fix this with:
            <pre className="code-block">
              <code>Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser</code>
            </pre>
          </li>
          <li>
            <strong>Way better tab completion:</strong> I'm discovering this is way easier than it was on Git Bash. If I type{" "}
            <code id="mid-paragraph-code">cd d</code> and hit tab, it'll scroll through any folder that starts with "d." Git Bash just went
            to the first alphabetically, and so you'd have to type at least two letters. This is helpful for me, as I'm one of those super
            organized guys who has folders called "portfolio 1," "portfolio 2", "portfolio latest", "portfolio final", "portfolio final
            really," and so on...
          </li>{" "}
          <li>
            <strong>Little annoyances:</strong> You have to hit <code id="mid-paragraph-code">ctrl c</code> to end your dev environment
            twice. My speedy-slash-almost-mindless muscle memory of typing <code id="mid-paragraph-code">ctrl c</code> →{" "}
            <code id="mid-paragraph-code">git status</code> → <code id="mid-paragraph-code">git add .</code> and having constant{" "}
            <code id="mid-paragraph-code">Terminate batch job (Y/N)?</code> alerts has been amusing.
          </li>
        </ul>

        <h2>My Takeaway</h2>
        <p>
          Switching to PowerShell wasn’t about abandoning Git Bash—it was about using the right tool for the job. If you’re working with
          Django on Windows, PowerShell’s native support for Windows paths and virtual environments will save you countless headaches.
        </p>
        <p>
          Domus is still in its early stages, but solving this terminal issue gave me the momentum to focus on what matters: designing
          features, debugging code, and learning more about Django’s ecosystem. If you’re starting your own Django journey, don’t let
          terminal troubles slow you down—PowerShell might just be the solution you need.
        </p>
      </section>
    </article>
  );
}

export default WhySwitchToPowershell;
