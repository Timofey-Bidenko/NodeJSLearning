Потрібно написати модуль, який експортує функцію, яка приймає мінімум 2 параметра,  перший параметр буде тип лога (Emergency, Alert, Critical, Error, Warning, Notice, Informational, Debug)

Функція має вивести в консоль інформацію в залежності від типу лога, та NODE_ENV (process.env.NODE_ENV)

для NODE_ENV = local всі тіпи

для NODE_ENV = development Emergency, Alert, Critical, Error, Warning, Notice

для NODE_ENV = production Emergency, Alert, Critical, Error

Також треба обробляти виключення (exceptions) і вивести необхідну інформацію про тип помилки 