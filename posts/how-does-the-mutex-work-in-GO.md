---
title: Using Mutex with GO on a real-world project.
description: You will learn how the mutex library helps you prevent some of the issues in concurrent world.
created_at: 2022-11-14T23:13:2300
tags:
    - GO
    - Mutex
    - Concurrency
---

### What will I learn?
I will be able to understand what is a Mutex,
and how it works in concurrent processes.
I will apply a mutex on a real-world project to see how we can benefit from it.


### What is a Mutex?
Mutex is a library that works on locking methods to not be accessible from other concurrent processes
until the mutex says that it's open.
Think of a mutex as the traffic police, and when the police block a road that's a `Lock()`, no car will pass until the Police open `Unlock()` the road.
![Road block](https://kanbanzone.com/wp-content/uploads/2020/01/blocked-road.jpg)


### How does it work?
As I would read in the [Go docs](https://pkg.go.dev/sync#Mutex) a Mutex must not be copied,
if I call the `Lock()` method then the mutex is locked and any other lock call will be waiting for it to be `Unlock()`-ed.
If I call the `Unlock()` method then the mutex will unblock itself and tell the lock method that `Mutex` is open.
Every time I copy a mutex then the state is unlocked, meaning it will have no effect.


> Before I describe how to apply on a project, try to set up [this project](https://github.com/Diarselimi/giftem#readme) in your maching, and see how it works.

### How do I apply it on a project?

This is a project that I was working on, it's about assigning gifs to employees, and each employee has to have one gift,
first come first serve.
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
...

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
...
```
The examples are just one object in the array but if you look at the files there are more data.

Next you will see the project structure [in github](https://github.com/Diarselimi/giftem).
The **main.go** file has the following content
```go
///...
var mutex = sync.Mutex{} //here we initialise Mutex, keep in mind this is outside of the methods.

func handler(w http.ResponseWriter, r *http.Request) {
    employeeId, err := strconv.Atoi(r.URL.Path[1:])
    if err != nil {
        fmt.Fprintf(w, "Employee with id %s not found", r.URL.Path[1:])
        return
    }
    mediator := application.CommandMediator{Mu: &mutex} //here we pass the mutex by reference
    mediator.Add(command.NewAssignGiftToEmployeeCommand(employeeId))

    mediator.Run()
}

func main() {
    http.HandleFunc("/", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

If I go ahead and open `CommandMediator` I will see that I use the mutex there to `Lock()` and `defer Unlock()`,
and `defer` is like saying execute this when you are done.
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
        command.Execute() // executing the command
    }
}

```
As I can see in the method `Run()` above, I am calling the mutex that is being passed from the main file, and then locking it.
So that means that the mutex that I am getting it's the same mutex that everyone else is getting when sending a request.
So that makes sense since we are passing mutex by reference and other people have the same instance of it,
someone might be faster than me in locking it then I must wait for the `Unlock()`.

### How long do I have to wait for my request?
Turns out it all depends on how your project is organized, in my small project I have blocked the mediator where the commands are executed,
meaning no one can execute the `Run()` until the first process is done.

```go
func (cm *CommandMediator) Run() {
    cm.Mu.Lock()
    defer cm.Mu.Unlock()

    for _, command := range cm.commands {
        command.Execute()
    }
}
```

To make the change more obvious I have added a `time.Sleep(5 * time.Second)` which will sleep for 5 seconds,
this is for me to try to simulate two requests at the same time.
So every time I run the command it will be blocked for 5 seconds.

### How do I see the effect?
Since I have the project on my machine, I can open a terminal and run the application by executing `go run main.go`,
next step would be to open the following link twice [http://localhost:8080/1](http://localhost:8080/1),
one will show you the gift one will show it after 5 seconds.

As a challenge I could try to disable the mutex in the mediator and see what happens when I click the link above twice or even more.




