CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

-- until here only for now


CREATE TABLE subscription_plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    max_requests INT CHECK (max_requests >= 0),  
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0)
);

CREATE TABLE user_subscriptions (
    user_id INT PRIMARY KEY,
    plan_id INT NOT NULL,
    requests_used INT DEFAULT 0 CHECK (requests_used >= 0),
    billing_cycle_start DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(id)
);

CREATE TABLE allowed_operations (
    id SERIAL PRIMARY KEY,
    operation_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE image_processing_requests (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    image_url TEXT NOT NULL,  
    operation VARCHAR(50) NOT NULL,  
    status ENUM('pending', 'processing', 'completed', 'failed') NOT NULL DEFAULT 'pending',
    result_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
-- Indexes for performance optimization

CREATE INDEX idx_image_requests_user ON image_processing_requests(user_id);
CREATE INDEX idx_user_subscriptions_user ON user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_plan ON user_subscriptions(plan_id);
