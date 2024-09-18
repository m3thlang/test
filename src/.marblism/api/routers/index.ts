/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createAccountRouter from "./Account.router";
import createUserRouter from "./User.router";
import createSessionRouter from "./Session.router";
import createTripRouter from "./Trip.router";
import createCityRouter from "./City.router";
import createOrderRouter from "./Order.router";
import createProductRouter from "./Product.router";
import createReviewRouter from "./Review.router";
import createMessageRouter from "./Message.router";
import { ClientType as AccountClientType } from "./Account.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as SessionClientType } from "./Session.router";
import { ClientType as TripClientType } from "./Trip.router";
import { ClientType as CityClientType } from "./City.router";
import { ClientType as OrderClientType } from "./Order.router";
import { ClientType as ProductClientType } from "./Product.router";
import { ClientType as ReviewClientType } from "./Review.router";
import { ClientType as MessageClientType } from "./Message.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        account: createAccountRouter(router, procedure),
        user: createUserRouter(router, procedure),
        session: createSessionRouter(router, procedure),
        trip: createTripRouter(router, procedure),
        city: createCityRouter(router, procedure),
        order: createOrderRouter(router, procedure),
        product: createProductRouter(router, procedure),
        review: createReviewRouter(router, procedure),
        message: createMessageRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    account: AccountClientType<AppRouter>;
    user: UserClientType<AppRouter>;
    session: SessionClientType<AppRouter>;
    trip: TripClientType<AppRouter>;
    city: CityClientType<AppRouter>;
    order: OrderClientType<AppRouter>;
    product: ProductClientType<AppRouter>;
    review: ReviewClientType<AppRouter>;
    message: MessageClientType<AppRouter>;
}
