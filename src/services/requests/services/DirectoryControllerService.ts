/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '@/services/requests';
import type { BaseResponse_long_ } from '@/services/requests';
import type { DeleteRequest } from '@/services/requests';
import type { DirectoryAddRequest } from '../models/DirectoryAddRequest';
import type { DirectoryUpdateRequest } from '../models/DirectoryUpdateRequest';
import type { CancelablePromise } from '@/services/requests';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DirectoryControllerService {
    /**
     * addTaskDirectories
     * @param directoriesItem directoriesItem
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addTaskDirectoriesUsingPOST(
        directoriesItem: DirectoryAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/directories/add',
            body: directoriesItem,
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
        deleteRequest: { id: string },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/directories/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * updateTasks
     * @param updateRequest updateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateTasksUsingPOST(
        updateRequest: { id: string; tagName: string },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/directories/update',
            body: updateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
