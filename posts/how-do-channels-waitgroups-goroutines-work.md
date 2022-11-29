---
title: Unlocking the Power of Concurrency in Go with Channels, Waitgroups, and Routines.
description: Go Channels, Waitgroups, and Go Routines are three powerful tools in the Go programming language. Go Channels provide a way to send and receive data between goroutines. Waitgroups allow you to wait for a collection of goroutines to finish before continuing execution. Go Routines are lightweight threads that can be used to run concurrent tasks. All three of these tools are essential for writing efficient and concurrent Go code.
created_at: 2022-11-29T12:12:2300
tags:
    - GO
    - goconcurrency
    - Channels
    - Waitgroups
    - gobasics
---

### What am I going to learn?
I will learn about Goroutines, how they help us run code concurrently.
I will learn how channels help us pass data from goroutines back to the main process.
I will learn how waitgroups help wait and notifies when goroutines are done with their work.
All these together help you achieve concurrent data handling, and processing.
You will also learn about new problems that concurrent processing brings if you are coming from languages like PHP.


### What are goroutines
Goroutines became famous especially for PHP developers, since they could not run code concurrently so easily, this was something I usually ran away from.
But when you start to learn GO, the first thing you learn is how to run a goroutine.
To run one goroutine you just need to say **GO** and then you give the method name to run.
```go
printHello() //prints Hello
go printSleeping() //prints Sleeping after 5 seconds
printBye() //prints Bye

//the output will look like the following

//Hello
//Bye
//Sleeping
```
Here you will see a visualisation of the process when executing with goroutines.
[!](../assets/img/concurrent_demonstration.gif)


### What are channels?
Channels are like bridges, on which you can pass data from one Goroutine to another.
There are two types of channels, blocking channels and buffered channels.
You can send any type of data into channels.


### What are waitgroups?
Waitgroups are processes where you can make a method to wait for x amount of time.
If I check the [docs about Waitgroups](https://pkg.go.dev/sync#WaitGroup) I will see that it is part of sync library [which we used before with mutexes](https://diarselimi.github.io/blog/how-does-the-mutex-work-in-GO).
Waitgroups are really helpfull when you are working with goroutines, they help you to wait for the job to be done.


### Do you have an example?
I created a small project which you can [see on github](https://github.com/Diarselimi/status-checker) you can also try it out, it's a simple website status checker which gets the response status code, and shows it on a webpage.
You can run `go run main.go` and I will see the results in the following link [http://localhost:8080/](http://localhost:8080/).
[!](../assets/img/status_page_result.png)


### What kind of problems does it solve?
This solves the problem when you want to process data concurrently and not wait for one method to be done.
Basically, it solves the concurrency problem, with these three features combined you can do a lot of concurrent processing.
If you look into the project code you will see that we execute code concurrently and at the end we print the results.


### Time comparison
This is a comparison in seconds for concurrent and non concurrent processing.
Time to finish with concurrency: 1.119483875± seconds
Time to finish without concurrency: 1.750224417± seconds
