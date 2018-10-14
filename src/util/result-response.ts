import { HttpStatus } from '@nestjs/common';

export class ResultResponse {

    public static Ok(verb: string, data) {
        let resultJSON;

        if (verb === 'POST') {
            resultJSON = {
                statusCode: HttpStatus.CREATED,
                results: data,
                info: {
                    version: '1.0.0',

                },
            };
        }

        if (verb === 'GET' || verb === 'DELETE') {
            resultJSON = {
                statusCode: HttpStatus.OK,
                results: data,
                info: {
                    length: data.length,
                    version: '1.0.0',
                },
            };
        }

        if (verb === 'PUT' || verb === 'DELETE') {
            resultJSON = {
                statusCode: HttpStatus.OK,
                results: data,
                info: {
                    version: '1.0.0',
                },
            };
        }

        return resultJSON;
    }

}