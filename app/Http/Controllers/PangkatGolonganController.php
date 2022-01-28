<?php

namespace App\Http\Controllers;

use App\Http\Requests\PangkatGolonganFormRequest as FormRequest;
use App\Models\PangkatGolongan;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PangkatGolonganController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $posts = PangkatGolongan::orderBy($request->sortby, $request->sortbydesc)
            ->when(request()->q, function ($posts) {
                $posts = $posts->where('nama', 'LIKE', '%' . request()->q . '%')
                    ->orWhere('keterangan', 'LIKE', '%' . request()->q . '%');
            });
        $items = $posts->paginate(request()->per_page);
        return response()->json(['status' => 'success', 'data' => $items]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(FormRequest $request)
    {
        //
        $runTransaction = function () use ($request) {
            try {
                $rowItem = new PangkatGolongan();
                $rowItem->nama = $request->nama;
                $rowItem->keterangan = $request->keterangan;
                $rowItem->save();

                $statusCode = JsonResponse::HTTP_OK;
                $status = [
                    'code'      => $statusCode,
                    'name'      => 'OK',
                    'message'   => 'Pangkat Golongan Save Successfully',
                ];

                /**
                 * Return Hasil
                 * --------------------------------------------------
                 */
                return response()->json([
                    'error' => false,
                    'status' => $status,
                ], $statusCode);
            } catch (Exception $e) {
                $statusCode = $e->getCode();
                $status = [
                    'code'      => $e->getCode(),
                    'name'      => '',
                    // 'message'   => $e->getMessage()
                ];
                return response()->json([
                    'error' => true,
                    'status' => $status
                ], $statusCode);
            }
        };
        $return = DB::transaction($runTransaction);
        return $return;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $data = PangkatGolongan::findOrFail($id);
        $statusCode = JsonResponse::HTTP_OK;
        $status = [
            'statusCode' => $statusCode . " OK",
            'status'    => 'success',
            'code'      => 0,
            'message'   => 'show user'
        ];

        return response()->json([
            'rows' => $data,
            'status' => $status,
        ], $statusCode);

        // return ($data)
        //     ->additional([
        //         'status'    => $status
        //     ])
        //     ->response()
        //     ->setStatusCode($statusCode);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(FormRequest $request, $id)
    {
        //
        $runTransaction = function () use ($request, $id) {
            try {
                $rowItem = PangkatGolongan::findOrFail($id);
                $rowItem->nama = $request->nama;
                $rowItem->keterangan = $request->keterangan;
                $rowItem->save();

                $statusCode = JsonResponse::HTTP_OK;
                $status = [
                    'code'      => $statusCode,
                    'name'      => 'OK',
                    'message'   => 'Pangkat Golongan Update Successfully',
                ];

                /**
                 * Return Hasil
                 * --------------------------------------------------
                 */
                return response()->json([
                    'error' => false,
                    'status' => $status,
                ], $statusCode);
            } catch (Exception $e) {
                $statusCode = $e->getCode();
                $status = [
                    'code'      => $e->getCode(),
                    'name'      => '',
                    // 'message'   => $e->getMessage()
                ];
                return response()->json([
                    'error' => true,
                    'status' => $status
                ], $statusCode);
            }
        };
        $return = DB::transaction($runTransaction);
        return $return;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $runTransaction = function () use ($id) {
            try {
                /**
                 * Table ERD tidak perlu dihapus
                 * Jika menggunakan SoflDeletes
                 * --------------------------------------------------
                 */

                /**
                 * Query 01
                 * --------------------------------------------------
                 * SoftDeletes tabel induk
                 */
                $rowItem = PangkatGolongan::findOrfail($id);
                $rowItem->delete();

                // /**
                //  * Query 01
                //  * --------------------------------------------------
                //  * SoftDeletes tabel ERD (hasMany)
                //  */
                // $rowItemWakil = Npwrd::where('npwrd_id', $id);
                // $rowItemWakil->delete();

                // /**
                //  * Query 02
                //  * --------------------------------------------------
                //  * SoftDeletes tabel ERD (hasMany)
                //  */
                // $rowItemWakil = User::where('pegawai_id', $id);
                // $rowItemWakil->delete();

                /**
                 * Return Hasil
                 * --------------------------------------------------
                 */
                $statusCode = JsonResponse::HTTP_OK;
                $status = [
                    'statusCode' => $statusCode . " Deleted",
                    'status'    => 'success',
                    'code'      => 0,
                    'message'   => 'delete opd'
                ];

                return response()->json([
                    'rows' => $rowItem,
                    'status' => $status,
                ], $statusCode);
                // return ($rowItem)
                //     ->additional([
                //         'status'    => $status
                //     ])
                //     ->response()
                //     ->setStatusCode($statusCode);
            } catch (Exception $e) {
                return response()->json(
                    [
                        'error' => 'Unable to delete',
                        // 'msg' => $e->getMessage()
                    ],
                    400
                );
            }
        };
        $return = DB::transaction($runTransaction);
        return $return;
    }

    public function getoption()
    {
        # code...
        /**
         * query default and/or with ERD
         * --------------------------------------------------
         */
        $query = PangkatGolongan::select('*');

        /**
         * Authentication user
         * --------------------------------------------------
         */
        // if (Auth::user()->hasRole(['Maintenance','Administrator'])){
        // }else{
        //     $query->Where('id', '=', $this->dataUser->id);
        // }

        /**
         * where data by ...
         * --------------------------------------------------
         */
        // $query->Where('ref_rek_6_id', '=', '5464');

        /**
         * sort data by ...
         * --------------------------------------------------
         */
        $data = $query->orderBy('id', 'ASC')->get();

        /**
         * Get data option
         * default tanpa Authentication user
         * --------------------------------------------------
         */
        $statusCode = JsonResponse::HTTP_OK;
        $status = [
            'statusCode' => $statusCode . " OK",
            'status'    => 'success',
            'code'      => 0,
            'message'   => 'get data option Counter'
        ];

        return response()->json([
            'rows' => $data,
            'status' => $status,
        ], $statusCode);

        // return (new Collection($data))
        //     ->additional([
        //         'status'    => $status
        //     ])
        //     ->response()
        //     ->setStatusCode($statusCode);
    }
}
