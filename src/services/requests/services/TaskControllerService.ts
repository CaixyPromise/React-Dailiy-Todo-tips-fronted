/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '@/services/requests';
import type { BaseResponse_List_TaskVO_ } from '../models/BaseResponse_List_TaskVO_';
import type { BaseResponse_long_ } from '@/services/requests';
import type { BaseResponse_TaskVO_ } from '../models/BaseResponse_TaskVO_';
import type { DeleteRequest } from '@/services/requests';
import type { TaskAddRequest } from '../models/TaskAddRequest';
import type { TaskUpdateRequest } from '../models/TaskUpdateRequest';
import type { CancelablePromise } from '@/services/requests';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import {TaskUpdateStatusRequest} from "@/services/requests/models/TaskUpdateStatusRequest";
import {BaseResponse_TaskFetchVO_} from "../../../../generated";
export class TaskControllerService {
    /**
     * addTasks
     * @param taskAddRequest taskAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addTasksUsingPOST(
        taskAddRequest: TaskAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/task/add',
            body: taskAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * deleteTasks
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteTasksUsingPOST(
        deleteRequest: DeleteRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/task/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * fetchTasks
     * @returns BaseResponse_List_TaskVO_ OK
     * @throws ApiError
     */
    public static fetchTasksUsingGET(): CancelablePromise<BaseResponse_TaskFetchVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/task/fetch',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * getTasksVOById
     * @param id id
     * @returns BaseResponse_TaskVO_ OK
     * @throws ApiError
     */
    public static getTasksVoByIdUsingGET(
        id?: number,
    ): CancelablePromise<BaseResponse_TaskVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/task/get/vo',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateTasks
     * @param postUpdateRequest postUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateTasksUsingPOST(
        postUpdateRequest: TaskUpdateRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/task/update',
            body: postUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateStatus
     * @param statusRequest statusRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateStatusUsingPOST(
        statusRequest: TaskUpdateStatusRequest,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/task/update/status',
            body: statusRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
