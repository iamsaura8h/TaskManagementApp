1️⃣ Tag your current commit as v1.0
You're already at the “basic MERN setup” stage, so let’s tag it:

bash
Copy
Edit
git tag -a v1.0 -m "MERN-Minima 1.0: Basic MERN setup"
git push origin v1.0
-a → annotated tag (stores message & metadata)

-m → tag message

git push origin v1.0 → pushes the tag to remote (GitHub)

3️⃣ Clone specific versions later
If you want to start a project with v1.0:

bash
Copy
Edit
git clone --branch v1.0 <repo-url> new-project
Or switch inside your repo:

bash
Copy
Edit
git checkout v1.0

80/20 takeaway: Forms = preventDefault + API call + show result.

flex flex-col gap-4 on <form> → stacks all child <div> vertically with spacing.

Each <div> around label+input → flex flex-col → label above input.

mb-1 on label → small margin under label.

className="p-2 border rounded" on input → consistent padding and border for neat look.

self-end on submit button → aligns it to the right.