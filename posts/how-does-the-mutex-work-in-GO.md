---
title: Using Mutex in GO on a real world project.
description: You will learn how the mutex library helps you prevent some of the issues in concurrent world.
created_at: 2022-11-14T23:13:2300
tags:
    - GO
    - Mutex
    - Concurrency
---

### What will I learn?
I will be able to understand what is Mutex and able to use it in any project,
without any fear of someone shaming me that I don't know what I am doing.

### So what is a Mutex?
Mutex is a library which works on locking structs to not be accessible from other concurrent processes.
The following picture has a nice diagram, there are two processes trying to do the same thing.

### How does it work?
As I would read in the [Go docs](https://pkg.go.dev/sync#Mutex) a Mutex must not be copied,
if I call the `Lock()` method then the mutex is locked and any other lock call will be waiting for it to unlock.
If I call the `Unlock()` method then the mutex will unblock itself and tell the lock method that `Mutex` is open.
Every time I copy a mutex then the state is unlocked.

### How do I apply it on a project?
> Before I describe how to apply on a project, try to set up [this project](https://github.com/Diarselimi/giftem#readme) in your maching, and see how it works.

This is a project that I was working on, it's about assigning gifs to employees, and each employee has to have one gift, first come first serve.
I have employees and gifts in two json files and they look like this:
```json
//gifts json
[{
    "name": "netflix card",
    "categories": ["music", "film", "pets", "scifi"]
    }, {
        "name": "gold plated water bottle",
        "categories": ["power lifting", "triathlons", "football", "crossfit", "handball", "running"]
    }
]

//employees json
[{
    "id": 1,
    "name": "severin",
    "interests": ["high end audio", "photography", "sitting comfortably"]
    }, {
        "id": 2,
        "name": "oliver",
        "interests": ["pets", "scifi", "music making"]
    }
]
```
As beautiful as this looks we have to move on, next you  will see the project structure [in github](https://github.com/Diarselimi/giftem).
The main.go file has the following content
```go
///...
var mutex = sync.Mutex{} //here we initialise Mutex, keep in mind this is outside of the methods.

func handler(w http.ResponseWriter, r *http.Request) {
    employeeId, err := strconv.Atoi(r.URL.Path[1:])
    if err != nil {
        fmt.Fprintf(w, "Employee with id %s not found", r.URL.Path[1:])
        return
    }
    mediator := application.CommandMediator{Mu: &mutex} //here we pass the mutex by address
    mediator.Add(command.NewAssignGiftToEmployeeCommand(employeeId))

    mediator.Run()
}

func main() {
    http.HandleFunc("/", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

If I go ahead and open CommandMediator I will see that I use the mutex there to `lock` and `defer Unlock()`,
```go
type CommandMediator struct {
    Mu       *sync.Mutex // important
    commands []Command
}
///...
func (cm *CommandMediator) Run() {
    cm.Mu.Lock() //locking
    defer cm.Mu.Unlock() //unlocking when job is done

    for _, command := range cm.commands {
        command.Execute()
    }
}

```
As I can see in the method `Run()` above, I am calling the mutex that is being passed from main file, and then locking it.
This is because when another request comes it will be the same mutex being passed to that request.
As a result the next mutex will not be able tu acquaire the lock since it's already been locked.
The important part in the CommandMediator is this `Mu *sync.Mutex`, this means that we want a mutex passed by reference and not just a copy.



