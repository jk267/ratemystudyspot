

CREATE TABLE restaurant(
    id INT,
    name VARCHAR(50),
    location VARCHAR(50),
    price_range INT
);


INSERT INTO restaurant (id, name, location, price_range) values (11, "a", "a", 1);



ix from problem


CREATE TABLE restaurant(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
);



CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(
        rating >= 1
        and rating <= 5
    )
);