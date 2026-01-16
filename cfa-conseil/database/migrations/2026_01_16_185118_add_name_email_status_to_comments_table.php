<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('comments', function (Blueprint $table) {
            // Add name if it doesn't exist
            if (!Schema::hasColumn('comments', 'name')) {
                $table->string('name')->nullable()->after('user_id');
            }

            // Add email if it doesn't exist
            if (!Schema::hasColumn('comments', 'email')) {
                $table->string('email')->nullable()->after('name');
            }

            // Add status if it doesn't exist
            if (!Schema::hasColumn('comments', 'status')) {
                $table->enum('status', ['pending', 'approved'])->default('pending')->after('content');
            }

            // Make user_id nullable safely
            if (Schema::hasColumn('comments', 'user_id')) {
                $table->foreignId('user_id')->nullable()->change();
            }
        });
    }

    public function down()
    {
        Schema::table('comments', function (Blueprint $table) {
            if (Schema::hasColumn('comments', 'status')) {
                $table->dropColumn('status');
            }
            if (Schema::hasColumn('comments', 'name')) {
                $table->dropColumn('name');
            }
            if (Schema::hasColumn('comments', 'email')) {
                $table->dropColumn('email');
            }
        });
    }
};
