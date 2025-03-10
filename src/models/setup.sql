CREATE TABLE main ( 
    mainkey TEXT UNIQUE NOT NULL, 
    mainKeyId SERIAL PRIMARY KEY,
    localId INTEGER DEFAULT 0,
    createdAt TIMESTAMP DEFAULT NOW(), 
    lastActiveAt TIMESTAMP DEFAULT NOW()
);
CREATE TABLE items (
    id INTEGER NOT NULL, 
    mainKeyId INTEGER NOT NULL,
    text VARCHAR(40) NOT NULL,
    status SMALLINT DEFAULT 0 CHECK (status IN (0, 1)),
    PRIMARY KEY (id, mainKeyId),
    FOREIGN KEY (mainKeyId) REFERENCES main(mainKeyId) ON DELETE CASCADE
);