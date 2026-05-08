CREATE TABLE users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE cycle_tracker (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    cycle_length INT NOT NULL,

    period_date DATE NOT NULL,

    symptoms TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE

);


CREATE TABLE pcod_predictions (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    age FLOAT,
    weight FLOAT,
    bmi FLOAT,
    cycle_length FLOAT,

    weight_gain TINYINT,
    hair_loss TINYINT,
    pimples TINYINT,
    stress TINYINT,

    prediction VARCHAR(50),
    confidence FLOAT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE

);


CREATE TABLE pcos_predictions (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    age FLOAT,
    weight FLOAT,
    bmi FLOAT,
    cycle_length FLOAT,

    hair_growth TINYINT,
    skin_darkening TINYINT,
    pimples TINYINT,
    fast_food TINYINT,

    prediction VARCHAR(50),
    confidence FLOAT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE

);