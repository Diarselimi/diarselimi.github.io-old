---
title: Learning GO
description: Moving from PHP to GO, things I find interesting and things I find hard to accept. 
created_at: 2022-08-27T23:23:2300
tags:
    - PHP
    - GO
    - Learning
---

### The main content
as asd asd asd as 
das d
as das    
a asd as 

| PHP - GO - interface example |
|------------------------------|
```php
<?php 
interface iPerson {
    public function name(): string;
    public function phone(): string;
}

//you use it like so
class Diar implements iPerson {
    public function __construct(
        private readonly string $name,
        private readonly string $phone,
    ) {}
    
    public function name(): string {
        return $this->name;
    }
    
    public function phone(): string {
        return $this->phone;
    }
}
```

```go
type IPerson interface {
    Name() string
    Phone() string
}

type Diar struct {
    name string
    phone string
}

func (d Diar) Name() string {
    return d.name
}

func (d Diar) Phone() string {
    return d.phone
}
```


### The second main content
as asd asd asd as
das d
as das    
a asd as 


| PHP - GO - interface example |
|------------------------------|
```php
<?php 
interface iPerson {
    public function name(): string;
    public function phone(): string;
}

//you use it like so
class Diar implements iPerson {
    public function __construct(
        private readonly string $name,
        private readonly string $phone,
    ) {}
    
    public function name(): string {
        return $this->name;
    }
    
    public function phone(): string {
        return $this->phone;
    }
}
```

```go
type IPerson interface {
    Name() string
    Phone() string
}

type Diar struct {
    name string
    phone string
}

func (d Diar) Name() string {
    return d.name
}

func (d Diar) Phone() string {
    return d.phone
}
```
