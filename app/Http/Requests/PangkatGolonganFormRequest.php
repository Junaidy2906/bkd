<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validator & JsonResponse
 * ==================================================
 */

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class PangkatGolonganFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        // $data = $this->request->all();
        // $method = $this->getMethod();

        $rule = [
            'nama'                      => ['required', 'string'],
            'keterangan'                      => ['required', 'string'],
        ];

        return $rule;
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json($validator->errors(), 422)
        );
    }

    public function messages()
    {
        return [
            // 'required' => 'The :attribute Field Is Required.',
        ];
    }

    public function attributes()
    {
        return [
            'nama'                      => 'Nama Golongan',
            'keterangan'                => 'Keterangan',
        ];
    }
}
