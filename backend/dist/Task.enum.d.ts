declare type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};
export declare enum Role {
    AVTASH = "\u05D0\u05D1\u05D8\u05E9",
    CLEAN = "\u05E0\u05D9\u05E7\u05D9\u05D5\u05DF",
    NIGHT = "\u05DC\u05D9\u05DC\u05D4",
    HANFZA = "\u05D4\u05E0\u05E4\u05E6\u05D4"
}
export declare enum Rank {
    NOTHING = "\u05E9\u05D5\u05DE\u05E8 \u05E9\u05D7\u05E8",
    YOUNG = "\u05E9\u05D5\u05DE\u05E8 \u05E6\u05E2\u05D9\u05E8",
    MID = "\u05E9\u05D5\u05DE\u05E8 \u05DE\u05E0\u05D5\u05E1\u05D4",
    LARGE = "\u05E9\u05D5\u05DE\u05E8 \u05E0\u05D8\u05D7\u05DF \u05E2\u05D5\u05D1\u05E8",
    HUGE = "\u05E8\u05D6 \u05DE\u05E9\u05D5\u05DC\u05DD"
}
export declare const taskDictionary: EnumDictionary<Role, number>;
export {};
