/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Track the trade of a Policy transferred from one person to another person
 * @param {org.sift.insure.network.Transfer} transfer - the transfer to be processed
 * @transaction
 */
async function transferPolicy(transfer) {
  transfer.policy.holder = transfer.holder;
  transfer.policy.beneficiary = transfer.beneficiary;
  let assetRegistry = await getAssetRegistry('org.sift.insure.network.Policy');
  await assetRegistry.update(transfer.policy);
}

/**
 * Track the trade of a FlightDelayPolicy Update
 * @param {org.sift.insure.network.UpdateFlightStatus} update - the fields to be update
 * @transaction
 */
async function updateFlightStatus(update) {
  update.policy.actualDepartureTimestamp = update.actualDepartureTimestamp;
  update.policy.status = update.updatedStatus;
  let assetRegistry = await getAssetRegistry('org.sift.insure.network.FlightDelayPolicy');
  await assetRegistry.update(update.policy);
}

/** Submit claim request for flight delay
 * @param {org.sift.insure.network.ClaimFlightDelay} claim - the claim to be processed
 * @transaction
 */
async function claimFlightDelay(claim) {
  let factory = getFactory();
  let compensationId = 'COMP_' + claim.transactionId;
  let compensation = factory.newResource('org.sift.insure.network', 'FlightDelayCompensation', compensationId);
  compensation.policy = claim.policy;
  compensation.requestTimestmap = claim.timestamp;
  compensation.status = "PENDING";
  compensation.comment = claim.comment;
  let assetRegistry = await getAssetRegistry('org.sift.insure.network.FlightDelayCompensation');
  await assetRegistry.add(compensation);
}
