export interface Medal{
    id: number,
    name: string,
    flag_url: string,
    gold_medals: string,
    silver_medals: string,
    bronze_medals: string,
    total_medals: string,
    rank: string,
    bronze_flag: string,
    silver_flag: string,
    gold_flag: string,
}

export interface MessageState {
    message: string
}

export interface Detail{
    id: number,
    name: string,
    size: string,
    population: string,
    gold_medal_sport: string,
    silver_medal_sport: string,
    bronze_medal_sport: string
}