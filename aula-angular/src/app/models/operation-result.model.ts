export interface OperationResult{
    success: boolean;
    data?: any;
    //200,201,400,401
    status?: number;
}