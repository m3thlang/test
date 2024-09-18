/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.CityInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).city.createMany(input as any))),

        create: procedure.input($Schema.CityInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).city.create(input as any))),

        deleteMany: procedure.input($Schema.CityInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).city.deleteMany(input as any))),

        delete: procedure.input($Schema.CityInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).city.delete(input as any))),

        findFirst: procedure.input($Schema.CityInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).city.findFirst(input as any))),

        findMany: procedure.input($Schema.CityInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).city.findMany(input as any))),

        findUnique: procedure.input($Schema.CityInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).city.findUnique(input as any))),

        updateMany: procedure.input($Schema.CityInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).city.updateMany(input as any))),

        update: procedure.input($Schema.CityInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).city.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.CityCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CityCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CityCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CityCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.CityCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CityCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CityGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CityGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CityCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CityCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CityGetPayload<T>, Context>) => Promise<Prisma.CityGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.CityDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CityDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CityDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CityDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.CityDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CityDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CityGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CityGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CityDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CityDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CityGetPayload<T>, Context>) => Promise<Prisma.CityGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.CityFindFirstArgs, TData = Prisma.CityGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.CityFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CityGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CityFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CityFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CityGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CityGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.CityFindManyArgs, TData = Array<Prisma.CityGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.CityFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.CityGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CityFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CityFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.CityGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.CityGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.CityFindUniqueArgs, TData = Prisma.CityGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.CityFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CityGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CityFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CityFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CityGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CityGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.CityUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CityUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CityUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CityUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.CityUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CityUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CityGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CityGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CityUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CityUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CityGetPayload<T>, Context>) => Promise<Prisma.CityGetPayload<T>>
            };

    };
}
