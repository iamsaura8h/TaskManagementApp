### How Axios works
When you make a request with Axios, e.g.  
```ts
const res = await api.post("/users", user);
```
- `res` is the **full HTTP response object**.  
It contains things like:  
```json
{
  "data": { ... },        // the actual JSON returned by backend
  "status": 201,          // HTTP status code
  "statusText": "Created",
  "headers": { ... },     // response headers
  "config": { ... },      // axios request config
  "request": { ... }      // request object
}
```

---

### `res.data`
- This is the **payload** your backend sent in `res.json(...)`.  
- From your backend code:  
  ```js
  res.status(201).json({
    message: "User created successfully",
    user: newUser,
  });
  ```
- So in the frontend:  
  ```ts
  res.data = {
    message: "User created successfully",
    user: { _id, name, age, about, createdAt, ... }
  }
  ```

---

### Why we return `res.data`
- **Frontend only needs the useful data**, not HTTP metadata.  
- Cleaner → components don’t care about status codes unless explicitly needed.  
- If you ever want to check status, you can still return `{ status: res.status, ...res.data }`.

---

⚡ Analogy:  
Think of Axios response as a **pizza delivery box**.  
- `res` = the whole box (with stickers, delivery receipt, etc).  
- `res.data` = the pizza inside 🍕 (the actual thing you care about).  

---

✅ So when we return `res.data` from services, our UI components can directly use `data.user` without dealing with extra response junk.  

