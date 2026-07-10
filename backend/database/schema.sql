-- Design Analysis Table
CREATE TABLE IF NOT EXISTS designs (
    id SERIAL PRIMARY KEY,
    design_id VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255),
    description TEXT,
    image_url VARCHAR(500),
    category VARCHAR(100),
    print_suitability FLOAT,
    quality_score FLOAT,
    trend_score FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sales Data Table
CREATE TABLE IF NOT EXISTS sales_data (
    id SERIAL PRIMARY KEY,
    design_id VARCHAR(255),
    sale_date DATE,
    quantity INT,
    revenue FLOAT,
    price FLOAT,
    FOREIGN KEY (design_id) REFERENCES designs(design_id)
);

-- Trends Table
CREATE TABLE IF NOT EXISTS trends (
    id SERIAL PRIMARY KEY,
    design_id VARCHAR(255),
    trend_category VARCHAR(100),
    trend_score FLOAT,
    seasonal_rating FLOAT,
    market_demand FLOAT,
    competitor_count INT,
    analyzed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (design_id) REFERENCES designs(design_id)
);

-- Consumer Preferences Table
CREATE TABLE IF NOT EXISTS consumer_preferences (
    id SERIAL PRIMARY KEY,
    age_group VARCHAR(50),
    region VARCHAR(100),
    preferred_style VARCHAR(100),
    color_preference VARCHAR(100),
    price_range VARCHAR(50),
    preference_score FLOAT,
    data_date DATE DEFAULT CURRENT_DATE
);

-- Recommendations Table
CREATE TABLE IF NOT EXISTS recommendations (
    id SERIAL PRIMARY KEY,
    design_id VARCHAR(255),
    strategy_type VARCHAR(100),
    recommendation TEXT,
    estimated_impact FLOAT,
    priority INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (design_id) REFERENCES designs(design_id)
);

-- Create indexes
CREATE INDEX idx_design_id ON designs(design_id);
CREATE INDEX idx_category ON designs(category);
CREATE INDEX idx_trend_score ON designs(trend_score);
CREATE INDEX idx_sale_date ON sales_data(sale_date);