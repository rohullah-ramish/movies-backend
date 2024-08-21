## Names for folders

- `controller` => `controllers`
- `middleware` => `middlewares`
- `model` => `models`
- `router` => `routes`

## Names for files

- `model/user.ts` => `models/user.model.ts`
- `controller/user.ts` => `controllers/user.controller.ts`
- `router/user.ts` => `routes/user.routes.ts`

## Exports in the file

### 1. Models

#### Existing

```
export const UserModel = mongoose.model("User", schema);
```

#### Recommended

```
export const User = mongoose.model("User", schema);
```

### 2. Controllers

#### Existing

```
exports.Login = async () => {}
```

#### Recommended

```
exports.login = async () => {}
```

## Database Config

- Should be present in `@/db/config.ts` instead of directly invoking in entry file. Here `@` means `/src/`

## Endpoint Seggregation

- The app is divided into two parts:
  - Movies
  - Users
    Following this strategy, we can create the endpoints like this:
    ```
    router.use("/users", userRoutes);
    router.use("/movies", movieRoutes);
    ```
